import TaskSchema from "./TaskSchema.js";
//insert
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};
//read
export const getTask = () => {
  return TaskSchema.find();
};
//update
export const updateTask = (_id, odj) => {
  return TaskSchema.findByIdAndUpdate(_id, odj, { new: true }); //only _id doesnot require curly brackets(i.e obj type)
};
//delete
export const delTasks = (_idArgs) => {
  return TaskSchema.deleteMany({
    _id: { $in: _idArgs },
  });
};
