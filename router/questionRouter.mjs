import { Router } from "express";
import pool from "../utils/db.mjs";
export const questionRouter = Router();
//-----DEMO ROUTER--------
questionRouter.get("/demo", async (req, res) => {
  try {
    const result = await pool.query("select * from questions");
    return res.status(200).json({ data: result.rows });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
//-----WORKS FINE---------
/**
 *requerment
  + ผู้ใช้งานสามารถสร้างคำถามได้ >> post OK
    - คำถามจะมีหัวข้อ และคำอธิบาย  //title, description OK
    - คำถามจะมีหมวดหมู่กำกับ เช่น Software, Food, Travel, Science, Etc. //category KO
  + ผู้ใช้งานสามารถที่จะดูคำถามทั้งหมดได้ >> get OK
  + ผู้ใช้งานสามารถที่จะดูคำถามแต่ละอันได้ ด้วย Id ของคำถามได้ >> get by params OK
  + ผู้ใช้งานสามารถที่จะแก้ไขหัวข้อ หรือคำอธิบายของคำถามได้ >> put
  + ผู้ใช้งานสามารถที่จะลบคำถามได้ >> delete
 */
//______________________________________Begin Code --- vvvvvvvv____________________

//ดูโพสทั้งหมด
questionRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, category, description
      FROM questions
      `);
    return res.status(200).json({ data: result.rows });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
//________________________________
//***************ห้ามสลับ***************** */
// เซิร์จหาโพส
questionRouter.get("/search", async (req, res) => {
  const category = req.query.category;
  const keyword = req.query.keyword;

  let query = `
  SELECT id, title, description, category
  FROM questions
  `;
  let values = [];

  //ทำ query ตามเงื่อนไข
  if (category && keyword) {
    query += ` WHERE category ilike $1 AND title ilike $2`;
    values = [`%${category}%`, `%${keyword}%`];
  } else if (keyword) {
    query += ` WHERE title ilike $1`;
    values = [`%${keyword}%`];
  } else if (category) {
    query += ` WHERE category ilike $1`;
    values = [`%${category}%`];
  }

  try {
    const result = await pool.query(query, values);
    if (!result.rows[0]) {
      return res.status(404).json({ message: `Requested Question not found` });
    } else {
      return res.status(200).json({ data: result.rows });
    }
  } catch (e) {
    return res.status(500).json({ message: `Unable to fetch a question.` });
  }
});

//ดูโพสตาม id
questionRouter.get("/:questionId", async (req, res) => {
  const questionIdFromClient = req.params.questionId;

  try {
    const result = await pool.query(
      `
    SELECT id, title, description, category 
    FROM questions
    WHERE id=$1
    `,
      [questionIdFromClient]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: `Question not found.`,
      });
    } else {
      return res.status(200).json({ data: result.rows });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: `Unable to fetch question. at ${questionIdFromClient}`,
    });
  }
});
//***************ห้ามสลับ***************** */
// _______________________________


//_______________________________
//สร้างโพส
questionRouter.post("/", async (req, res) => {
  const newQuestion = {
    ...req.body,
  };

  try {
    await pool.query(
      `
    INSERT INTO questions (title, description, category) 
    VALUES ($1, $2, $3 )
    `,
      [newQuestion.title, newQuestion.description, newQuestion.category]
    );
    return res.status(201).json({ message: `Question created successfully.` });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Sever could not create Qusetion: ${e.message}` });
  }
});
//_______________________________
//แก้ไขโพส
questionRouter.put("/:questionId", async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  const updatedQuestion = { ...req.body };
  try {
    const result = await pool.query(
      `
    UPDATE questions 
    SET title=$2, category=$3, description=$4
    WHERE id=$1
    `,
      [
        questionIdFromClient,
        updatedQuestion.title,
        updatedQuestion.category,
        updatedQuestion.description,
      ]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Question not found.` });
    } else {
      return res.status(201).json({
        message: `Update Question successfully.`,
      });
    }
  } catch (e) {
    console.log(e.message);

    return res.status(500).json({
      message: `Unable to fetch questions.`,
    });
  }
});
//_______________________________
//ลบโพส
questionRouter.delete("/:questionId", async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  try {
    const result = await pool.query(
      `
    DELETE FROM questions
    WHERE id=$1
    `,
      [questionIdFromClient]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Question not found.` });
    } else {
      return res.status(201).json({
        message: `Question post has been deleted successfully.`,
      });
    }
  } catch (e) {
    console.log(e.message);
    return res
      .status(500)
      .json({ message: `Unable to delete question. ${e.message}` });
  }
});

/** DEMO Body
 * {
  "title": "question #999",
  "description": "Morbi non quam nec dui luctus rutrum. Nulla tellus.",
  "category": "Software",
}
 */
