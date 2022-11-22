// import { get } from "mongoose";
import { useEffect, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { List } from "./components/List";
import {
  addTask,
  deleteTasks,
  fetchTasks,
  updateTask,
} from "./helpers/axiosHelper.js";

const ttlHrPerWek = 24 * 7;
function App() {
  const [tasks, setTasks] = useState([]); //replace by db
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [response, setResponse] = useState({});

  const totalHrs = tasks.reduce((acc, item) => acc + item.hr, 0);
  const [allEntrySelected, setAllEntrySelected] = useState([false]);
  const [allBadSelected, setAllBadSelected] = useState([false]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetchTasks();
    console.log(res.data.data);
    setTasks(res.data.data);
  };

  const taskEntry = async (taskObj) => {
    if (totalHrs + taskObj.hr > ttlHrPerWek) {
      setResponse({
        status: "error",
        message: "Too many hrs",
      });
      return;
      // return alert("Yo Boss, too many hours, can't fit the task.");
    }
    const { data } = await addTask(taskObj);
    if (data.status === "success") {
      getData();
    }
    //  setTasks([...tasks, taskObj]);//instead of adding of array,add to db
    setResponse(data);
  };

  // const handleOnDelete = (_id) => {
  //   if (!window.confirm("Are you sure you want to delete?")) {
  //     return;
  //   }

  //   const filteredArg = tasks.filter((item) => item._id !== _id);

  //   setTasks(filteredArg);
  // };

  const handleOnManyDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    //call axio helper to call and del items fromd b

    // const resp = await deleteTasks(idsToDelete);
    //selecting only data frm whole resp o/p
    const { data } = await deleteTasks(idsToDelete);
    console.log(data);
    setResponse(data);
    data.status === "success" && getData();
    setIdsToDelete([]);
    ////console.log(idsToDelete);
    // const filteredArg = tasks.filter((item) => !idsToDelete.includes(item._id));

    // setTasks(filteredArg);
    // setIdsToDelete([]);
  };

  const taskSwitcher = async (_id, type) => {
    console.log(tasks);
    const { data } = await updateTask({ type, _id });
    setResponse(data);
    data.status === "success" && getData();
    //call axio to call put method with data
    //on sucess updte fetch data
  };

  //
  const handleOnCheck = (e) => {
    const { checked, value } = e.target;

    console.log(checked, value);

    if (!checked) {
      const { type } = tasks.filter((item) => item._id === value)[0];
      console.log(type);
      type === "entry" ? setAllEntrySelected(false) : setAllBadSelected(false);
    }

    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      const tempArg = idsToDelete.filter((item) => item !== value);
      setIdsToDelete(tempArg);
    }
  };

  //console.log(idsToDelete);

  //select all
  // const handleOnSelectAll = (e) => {
  //   checked && value === "entry" && setAllEntrySelected(true);

  //   checked && value === "bad" && setAllBadSelected(true);
  //   const { checked, value } = e.target;
  //   console.log(checked, value);

  //   if (checked) {
  //     const argToGetIds = tasks.filter((item) => {
  //       return item.type === value;
  //     });
  //     const ids = argToGetIds.map((item) => {
  //       return item._id;
  //     });
  //     setIdsToDelete(ids);
  //   } else {
  //     //unselect
  //     setIdsToDelete([]);
  //   }
  // };
  const handleOnSelectAll = (e) => {
    const { checked, value } = e.target;

    if (value === "entry") {
      checked ? setAllEntrySelected(true) : setAllEntrySelected(false);
    }

    if (value === "bad") {
      checked ? setAllBadSelected(true) : setAllBadSelected(false);
    }

    if (checked) {
      // slecet all
      const argToGetIds = tasks.filter((item) => {
        return item.type === value;
      });

      const ids = argToGetIds.map((item) => item._id);

      setIdsToDelete([...idsToDelete, ...ids]);
    } else {
      //unselect
      setIdsToDelete([]);

      // ony unselect the ids taht belongs to the value === entry || bad
    }
  };
  return (
    <div className="wrapper">
      <div className="container">
        {/* <!-- top title --> */}
        <div className="row">
          <div className="col text-center mt-5">
            <h1>Not To Do List</h1>
          </div>
        </div>
        {/* /////// */}
        {response.message && (
          <div
            className={
              response.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          ></div>
        )}

        <Form taskEntry={taskEntry} />

        <List
          tasks={tasks}
          // handleOnDelete={handleOnDelete}
          taskSwitcher={taskSwitcher}
          handleOnCheck={handleOnCheck}
          idsToDelete={idsToDelete}
          handleOnSelectAll={handleOnSelectAll}
          allEntrySelected={allEntrySelected}
          allBadSelected={allBadSelected}
        />

        {idsToDelete.length > 0 && (
          <div className="d-grid py-4">
            <button
              className="btn btn-lg btn-danger"
              onClick={handleOnManyDelete}
            >
              Delete selected tasks
            </button>
          </div>
        )}

        {/* <!-- total hr area --> */}
        <div className="row fw-bold">
          <div className="col">The total hours allocated = {totalHrs} Hrs</div>
        </div>
      </div>
    </div>
  );
}

export default App;
