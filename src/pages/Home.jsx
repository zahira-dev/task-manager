/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Todo from "../components/Todo";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();
  console.log("hello");
  const viewItem = (id) => {
    navigate(`/${id}`);
  };
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Successfully deleted!");
      getTasks();
    } else {
      toast.error("Error Deleting This Task");
    }
  };
  const getTasks = async () => {
    const data = await (await fetch("http://localhost:5000/tasks")).json();

    setTasks(data);
  };
  useEffect(() => {
    // fetch data

    getTasks();
  }, []);
  return (
    <Layout>
      <div>
        <button
          style={{ marginRight: 10 }}
          onClick={() => {
            navigate("/new");
          }}
          value="Add"
        >
          {" "}
          Add
        </button>

        {tasks.map((task, index) => {
          return (
            <Todo
              key={index}
              task={task}
              onDelete={deleteTask}
              onViewPage={viewItem}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
