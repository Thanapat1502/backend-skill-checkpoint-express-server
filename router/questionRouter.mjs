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