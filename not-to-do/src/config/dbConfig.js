import mongoose from "mongoose";
const mongoConnect = async () => {
  try {
    const conStr = "mongodb://localhost:27017/not_to_do_list";

    const con = await mongoose.connect(conStr);
    con && console.log("MongoDb Connected");
  } catch (error) {
    console.log(error);
  }
};
export default mongoConnect;
