import express from "express";
import morgan from "morgan";
import cors from "cors";
//morgan is middleware

const app = express();

const PORT = 8000;
app.use(morgan("mero app chalyo"));
app.use(express.json());
app.use(cors());
//db connect
import mongoConnect from "./src/config/dbConfig.js";
mongoConnect();

//apiendpoints
import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/task", taskRouter);

///

// app.get("/api/v1/hey", (req, res) => {
//   res.json({ message: "hi" });
// });

//api endpoints
//things needed: workflow:crud
/////////C(create)=>receive new task and store in the db
// app.post("/api/v1/task", (req, res) => {
//   res.json({ message: "todo post method" });
// });
// //////////////r(Read)=> read data from db and return to client
// app.get("/api/v1/task", (req, res) => {
//   res.json({ message: "to do read method" });
// });
// /////////////u(update)=> updata some info of existing data int the db and respond client
// app.put("/api/v1/task", (req, res) => {
//   res.json({ message: "Todo get method" });
// });
// //////////////d(del)=>del data from db and respond client acc.
// app.delete("/api/v1/task", (req, res) => {
//   res.json({ message: "TODO DEL METHOD" });
// });
///
////***************handling alls server errors

///for path error to end pts
app.use("*", (req, res) => {
  res.status(400).json({
    status: "error",
    message: "invalid request",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
////
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at Localhost:http://localhost:${PORT}`);
});
