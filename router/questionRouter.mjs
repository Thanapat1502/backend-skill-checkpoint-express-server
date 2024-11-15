import { Router } from "express";
import pool from "../utils/db.mjs";
import { clientPostValidation } from "../middleware/question.validation.mjs";
import { queryParamsValidation } from "../middleware/question.validation.mjs";
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

//______________________________________Begin Code --- vvvvvvvv____________________

//ดูโพสทั้งหมด DONE
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
// เซิร์จหาโพส +++++MAKE VALIDATION FOR 400 DONE
questionRouter.get("/search", queryParamsValidation, async (req, res) => {
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

//ดูโพสตาม id DONE
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

//สร้างโพส DONE
questionRouter.post("/", clientPostValidation, async (req, res) => {
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

//แก้ไขโพส DONE
questionRouter.put("/:questionId", clientPostValidation, async (req, res) => {
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

//ลบโพส DONE
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

/**
 * @swagger
 * /questions/demo:
 *   get:
 *     summary: Get demo questions
 *     responses:
 *       200:
 *         description: A list of demo questions
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     responses:
 *       200:
 *         description: A list of questions
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/search:
 *   get:
 *     summary: Search questions by category and keyword
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of questions
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Requested question not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     summary: Get a question by ID
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A question object
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   put:
 *     summary: Update a question by ID
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Update Question successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   delete:
 *     summary: Delete a question by ID
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Question post has been deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
