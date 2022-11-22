// import React from "react";
import axios from "axios";
const rootUrl = "http://localhost:8000/api/v1/task/";

export const fetchTasks = async () => {
  try {
    return axios.get(rootUrl);
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const addTask = (taskObj) => {
  try {
    return axios.post(rootUrl, taskObj);
  } catch (error) {
    console.log(error.message, "test msg from axoisHelper");
    return {
      status: "error",
      message: "Unavle to process your request",
    };
  }
};

//

export const deleteTasks = (_idsArg) => {
  try {
    return axios.delete(rootUrl, { data: _idsArg });
  } catch (error) {
    return {
      status: error,
      message: error.message,
    };
  }
};
export const updateTask = (obj) => {
  try {
    return axios.put(rootUrl, obj);
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
    // console.log(error)
  }
};
// 	return (

// 	<div>axiosHelper</div>
//   )
//}

// export default axiosHelper
