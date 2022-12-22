/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

import { useNavigate } from "react-router-dom";

function Todo({ task, onDelete }) {
  const navigate = useNavigate();

  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.done === true ? "yes" : "no"}</p>
      <div>
        <button
          style={{ marginRight: 10 }}
          onClick={() => {
            navigate(`/${task.id}`);
          }}
          value="Add"
        >
          View Task
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => navigate(`/edit/${task.id}`)}
          value="edit"
        >
          {" "}
          Edit Task
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => onDelete(task.id)}
          value="delete"
        >
          {" "}
          Delete Task
        </button>
      </div>
    </div>
  );
}

export default Todo;
