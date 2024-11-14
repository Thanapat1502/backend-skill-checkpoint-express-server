import pool from "../utils/db.mjs";
export const voteQuestionValidation = async (req, res, next) => {
  const vote = req.body.vote;
  const questionIdFromClient = req.params.questionId;
 
  try {
    const result = await pool.query(
      `
      SELECT id
      FROM questions
      WHERE id=$1
      `,
      [questionIdFromClient]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: `Question not found` });
    }
  } catch (e) {
    return res.status(500).json({ message: `Sever not respond: ${e.message}` });
  }

  if (typeof vote !== `number`) {
    return res.status(400).json({
      message: `Invalid vote value. Vote must be Number `,
    });
  }

  if (vote !== 1 && vote !== -1) {
    console.log(vote);
    console.log(vote > 1 || vote < -1);
    return res.status(400).json({
      message: `Invalid vote value. Vote must be 1 or -1 `,
    });
  }
  next();
};

export const voteAnswerValidation = async (req, res, next) => {
  const vote = req.body.vote;
  const questionIdFromClient = req.params.answerId;

  try {
    const result = await pool.query(
      `
        SELECT id
        FROM questions
        WHERE id=$1
        `,
      [questionIdFromClient]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ message: `Question not found` });
    }
  } catch (e) {
    return res.status(500).json({ message: `Sever not respond: ${e.message}` });
  }

  if (typeof vote !== `number`) {
    return res.status(400).json({
      message: `Invalid vote value. Vote must be Number `,
    });
  }

  if (vote !== 1 && vote !== -1) {
    console.log(vote);
    console.log(vote > 1 || vote < -1);
    return res.status(400).json({
      message: `Invalid vote value. Vote must be 1 or -1 `,
    });
  }
  next();
};
