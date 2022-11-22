import express from "express";
import {
  delTasks,
  getTask,
  insertTask,
  updateTask,
} from "../models/task/TaskModel.js";
const router = express.Router();

// workflow : CRUD
// C(create) => receive new task and store in the database
router.post("/", async (req, res, next) => {
  try {
    const result = await insertTask(req.body);
    console.log(result);
    res.json({ status: "success", message: "New task has been added" });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// R(Read) => read data from data base and return to the client
router.get("/", async (req, res) => {
  const data = await getTask();
  res.json({
    status: "success",
    message: "Here are the available list",
    data,
  });
});

// U(Update) => update some information of existing data int he database and respond client accordingly
router.put("/", async (req, res) => {
  const { _id, type } = req.body;
  console.log(req.body);

  const result = await updateTask(_id, { type });
  if (result?._id) {
    res.json({
      status: "success",
      message: "Updated Successfully",
      // data,
    });
  }
  //   fakeTaskTable.map((item) => {
  //   if (item._id === _id) {
  //     item.type = type;
  //   }
  //   return item;
  // });
  else {
    res.json({ message: "todo put method", status: "success" });
  }
});

//D(Delete) => Delete data(s) from database and response client accordingly
// const del = await delTask(_id, { type });

router.delete("/", async (req, res) => {
  // const { _id } = req.params;
  //const { _id } = req.body;

  const result = await delTasks(req.body);
  if (result?.deletedCount) {
    res.json({
      status: "success",
      message: "The selected task has been delete",
    });
  } else {
    res.json({
      status: "success",
      message: "Nothing to delete",
    });
  }
});

export default router;
