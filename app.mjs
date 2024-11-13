import express from "express";
import pool from "./utils/db.mjs";
import { questionRouter } from "./router/questionRouter.mjs";
/**
 *requerment
  + ผู้ใช้งานสามารถสร้างคำถามได้ >> post
    - คำถามจะมีหัวข้อ และคำอธิบาย  //body
    - คำถามจะมีหมวดหมู่กำกับ เช่น Software, Food, Travel, Science, Etc. //body
  + ผู้ใช้งานสามารถที่จะดูคำถามทั้งหมดได้ >> get
  + ผู้ใช้งานสามารถที่จะดูคำถามแต่ละอันได้ ด้วย Id ของคำถามได้ >> get by params
  + ผู้ใช้งานสามารถที่จะแก้ไขหัวข้อ หรือคำอธิบายของคำถามได้ >> put
  + ผู้ใช้งานสามารถที่จะลบคำถามได้ >> delete
 */

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions", questionRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
