import { Router } from "express";
import pool from "../utils/db.mjs";
export const answerRouter = Router();

// post สร้างคำตอบใหม่ให้  question id
answerRouter.post("/:questionId/answers", async (req, res) => {
  const newAnswer = { ...req.body };
  const questionIdFromClient = req.params.questionId;
  try {
    await pool.query(
      `
          INSERT INTO answers (content, question_id)
          VALUES ($1,$2)
          `,
      [newAnswer.content, questionIdFromClient]
    );
    return res.status(201).json({ message: `Answer created successfully.` });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Unable to create answers. see error ${e.message}` });
  }
});

// get รับคำตอบจาก question id
answerRouter.get("/:questionId/answers", async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  try {
    const result = await pool.query(
      `
    SELECT answers.id, content
    FROM answers
    INNER JOIN questions
    ON answers.question_id = questions.id
    WHERE questions.id=$1;
        `,
      [questionIdFromClient]
    );

    return res.status(200).json({ data: result.rows });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Could not get answer ${e.message}` });
  }
});

//delete ลบคำตอบจากคำถาม
answerRouter.delete("/:questionId/answers", async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  try {
    await pool.query(
      `
          DELETE FROM answers
          WHERE question_id=$1
          `,
      [questionIdFromClient]
    );
    return res.status(200).json({
      message: `All answers for the question have been deleted successfully.
`,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Unable to delete answers. see error ${e.message}` });
  }
});
