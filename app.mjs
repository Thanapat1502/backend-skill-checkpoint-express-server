import express from "express";
import pool from "./utils/db.mjs";
import { questionRouter } from "./router/questionRouter.mjs";
import { answerRouter } from "./router/answerRouter.mjs";
import { voteRouter } from "./router/voteRouter.mjs";
/**
 *requerment
  + ผู้ใช้งานสามารถสร้างคำถามได้ >> post ||----------------------------------------- DONE
    - คำถามจะมีหัวข้อ และคำอธิบาย  //body || DONE
    - คำถามจะมีหมวดหมู่กำกับ เช่น Software, Food, Travel, Science, Etc. //body ||-- DONE
  + ผู้ใช้งานสามารถที่จะดูคำถามทั้งหมดได้ >> get || DONE
  + ผู้ใช้งานสามารถที่จะดูคำถามแต่ละอันได้ ด้วย Id ของคำถามได้ >> get by params ||------- DONE
  + ผู้ใช้งานสามารถที่จะแก้ไขหัวข้อ หรือคำอธิบายของคำถามได้ >> put ||-------------------- DONE
  + ผู้ใช้งานสามารถที่จะลบคำถามได้ >> delete ||------------------------------------- DONE
 */

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions", questionRouter);
app.use("/questions", answerRouter);
app.use("/questions", voteRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
