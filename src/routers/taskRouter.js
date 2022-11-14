import express from "express";
const router = express.Router();
//dummy db
let fakeTaskTable = [
  {
    _id: 1,
    task: "watching tv",
    hr: 22,
  },
  {
    _id: 2,
    task: "Listeniing radio",
    hr: 33,
  },
  {
    _id: 3,
    task: "walking in the park ",
    hr: 44,
  },
];

router.post("/", (req, res) => {
  console.log(req.body);
  fakeTaskTable.push(req.body);
  res.json({ message: "New task has been added" });
});
//////////////r(Read)=> read data from db and return to client
router.get("/", (req, res) => {
  res.json({
    status: "success",
    data: fakeTaskTable,
    message: "to do read method",
  });
});
/////////////u(update)=> updata some info of existing data int the db and respond client
router.put("/", (req, res) => {
  const { _id, type } = req.body;
  fakeTaskTable.map((item) => () => {
    if (item._id === _id) {
      item.type = type;
    }
    return item;
  });
  res.json({ message: "Todo get method", status: "success" });
});
//////////////d(del)=>del data from db and respond client acc.
router.delete("/:_id?", (req, res) => {
  //   const { _id } = req.body;
  const { _id } = req.params;

  if (!_id) {
    res.status(400).json({
      status: "error",
      message: "Plz fix server",
    });
    return;
  }
  fakeTaskTable = fakeTaskTable.filter((item) => item._id !== _id);
  res.json({
    status: "success",
    message: "data deleted",
  });
});

export default router;
