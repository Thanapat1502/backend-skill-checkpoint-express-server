import express from "express";
import pool from "./utils/db.mjs";
import { questionRouter } from "./router/questionRouter.mjs";
import { answerRouter } from "./router/answerRouter.mjs";
import { voteRouter } from "./router/voteRouter.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 4000;
app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});
app.use("/questions", questionRouter);
app.use("/questions", answerRouter);
app.use("/questions", voteRouter);

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API for Quora-like application",
    },
  },
  sever: [{ url: `http://localhost:${port}` }],
  apis: ["app.mjs"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

//for question
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
//for answer
/**
 * @swagger
 * /questions/{questionId}/answers:
 *   post:
 *     summary: Create a new answer for a question
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
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   get:
 *     summary: Get answers for a specific question
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of answers
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   delete:
 *     summary: Delete all answers for a specific question
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All answers for the question have been deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
//for vote
/**
 * @swagger
 * /questions/{questionId}/vote:
 *   post:
 *     summary: Vote on a question
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
 *               vote:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vote on the question has been recorded successfully
 *       400:
 *         description: Invalid vote data
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /answers/{answerId}/vote:
 *   post:
 *     summary: Vote on an answer
 *     parameters:
 *       - in: path
 *         name: answerId
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
 *               vote:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Vote on the answer has been recorded successfully
 *       400:
 *         description: Invalid vote data
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Server error
 */
