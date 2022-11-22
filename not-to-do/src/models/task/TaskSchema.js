import mongoose from "mongoose";

const tastSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      max: 168, //max hrs allowed
    },
    hr: {
      type: Number,
    },
    type: {
      type: String,
      default: "entry",
    },
  },
  {
    timestamps: true,
  }
);
//table name

export default mongoose.model("Task", tastSchema); //task becomes tasks in db
