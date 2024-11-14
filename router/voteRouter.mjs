import { Router } from "express";
import pool from "../utils/db.mjs";
import {
  voteQuestionValidation,
  voteAnswerValidation,
} from "../middleware/vote.validation.mjs";

export const voteRouter = Router();

//vote สำหรับคำถาม +++++MAKE 400 INVALID AND 404 NOT FOUND
voteRouter.post(
  "/:questionId/vote",
  voteQuestionValidation,
  async (req, res) => {
    const newVote = { ...req.body };
    const questionIdFromClient = req.params.questionId;

    try {
      await pool.query(
        `
          INSERT INTO question_votes (question_id, vote)
          VALUES ($1, $2)
          `,
        [questionIdFromClient, newVote.vote]
      );
      return res.status(200).json({
        message: `Vote on the question has been recorded successfully.`,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: `Sever not respond: ${e.message}` });
    }
  }
);

//vote สำหรับคำตอบ +++++MAKE 400 INVALID AND 404 NOT FOUND
voteRouter.post(
  "/answers/:answerId/vote",
  voteAnswerValidation,
  async (req, res) => {
    const newVote = { ...req.body };
    const answerIdFromClient = req.params.answerId;
    try {
      const result = await pool.query(
        `
            INSERT INTO answer_votes (answer_id, vote)
            VALUES ($1, $2)
            `,
        [answerIdFromClient, newVote.vote]
      );
      return res.status(200).json({
        message: `Vote on the answer has been recorded successfully.`,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: `Sever not respond: ${e.message}` });
    }
  }
);
