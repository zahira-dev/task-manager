import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const EditPage = () => {
  const [task, setTask] = useState({ name: "", done: false });
  const navigate = useNavigate();
  // getting id from url

  const { id } = useParams();

  const onAdd = async () => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: task.name, done: task.done }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Successfully edited!");
      setTask(task);
    } else {
      toast.error("Error editing This Task");
    }
  };
  const handleChangeDone = (event) => {
    setTask({ ...task, done: event.target.checked });
  };
  const handleChangeName = (event) => {
    setTask({ ...task, name: event.target.value });
  };
  const getOneTask = async (id) => {
    // calling the Api to get a Task of Id coming from input
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    // getting the json format from my response of the task
    const taskData = await response.json();
    console.log(taskData);
    // stroring the task that i got from the api in the state
    setTask(taskData);
  };
  useEffect(() => {
    // invocation of the function get one task and passing it the id from useParams
    getOneTask(id);
  }, []);
  return (
    <Layout>
      <div>
        <div>
          <label>
            {" "}
            Edit name :
            <input
              id="name"
              type="text"
              onChange={handleChangeName}
              value={task.name}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              id="done"
              type="checkbox"
              onChange={handleChangeDone}
              checked={task.done}
            />{" "}
            Done
          </label>
        </div>
        <button
          style={{ backgroundcolor: "red", padding: 10, marginLeft: 10 }}
          onClick={() => navigate("/")}
        >
          Cancel{" "}
        </button>
        <button
          style={{ backgroundcolor: "green", padding: 10, marginLeft: 10 }}
          onClick={() => onAdd()}
        >
          Save{" "}
        </button>
      </div>
    </Layout>
  );
};

export default EditPage;
