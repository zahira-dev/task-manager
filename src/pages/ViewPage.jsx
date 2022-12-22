import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const ViewPage = () => {
  const navigate = useNavigate();
  // declaration of a state called task
  const [task, setTask] = useState({ name: "", done: false });
  // getting id from url
  const { id } = useParams();
  // declaring a function that accept an input as id and  get that task from Api then storing it in the state
  const getOneTask = async (id) => {
    // calling the Api to get a Task of Id coming from input
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    // getting the json format from my response of the task
    const taskData = await response.json();
    // stroring the task that i got from the api in the state
    setTask(taskData);
  };
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Successfully deleted!");
      getOneTask();
      navigate("/");
    } else {
      toast.error("Error Deleting This Task");
    }
  };

  useEffect(() => {
    // invocation of the function get one task and passing it the id from useParams
    getOneTask(id);
  }, []);

  return (
    <Layout>
      <div>
        <h1>Here is your task</h1>
        <div>
          <h3>{task.name}</h3>
        </div>
        <div>
          Done :
          <input type="checkbox" checked={task.done} readOnly />
        </div>
        <div>
          <button
            style={{ marginRight: 10 }}
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          >
            Edit
          </button>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPage;
