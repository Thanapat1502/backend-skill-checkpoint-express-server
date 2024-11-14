import { Router } from "express";
import pool from "../utils/db.mjs";
import { answerPostValidation } from "../middleware/answer.validation.mjs";
export const answerRouter = Router();

// post สร้างคำตอบใหม่ให้  question id ++++++++MAKE 404 NOT FOUND wait for fix
answerRouter.post(
  "/:questionId/answers",
  [answerPostValidation],
  async (req, res) => {
    const newAnswer = { ...req.body };
    const questionIdFromClient = req.params.questionId;

    try {
      const checkQuestionId = await pool.query(
        `SELECT id FROM questions WHERE id=$1`,
        [questionIdFromClient]
      );
      if (!checkQuestionId.rows[0]) {
        return res.status(404).json({ message: `Question not found` });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ message: `Sever not respond: ${e.message}` });
    }

    try {
      const result = await pool.query(
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
  }
);

// get รับคำตอบจาก question id DONE
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

    if (!result.rows[0]) {
      return res.status(404).json({ message: `Question not found.` });
    } else {
      return res.status(200).json({ data: result.rows });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Could not get answer ${e.message}` });
  }
});

//delete ลบคำตอบจากคำถาม DONE
answerRouter.delete("/:questionId/answers", async (req, res) => {
  const questionIdFromClient = req.params.questionId;
  try {
    const result = await pool.query(
      `
          DELETE FROM answers
          WHERE question_id=$1
          `,
      [questionIdFromClient]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `Question not found.` });
    } else {
      return res.status(200).json({
        message: `All answers for the question have been deleted successfully.`,
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Unable to delete answers. see error ${e.message}` });
  }
});
