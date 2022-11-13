import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ message: "todo post method" });
});
//////////////r(Read)=> read data from db and return to client
router.get("/", (req, res) => {
  res.json({ message: "to do read method" });
});
/////////////u(update)=> updata some info of existing data int the db and respond client
router.put("/", (req, res) => {
  res.json({ message: "Todo get method" });
});
//////////////d(del)=>del data from db and respond client acc.
router.delete("/", (req, res) => {
  res.json({ message: "TODO DEL METHOD" });
});
export default router;
