import { useState, React } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const NewTask = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const onAdd = async () => {
    console.log(name);
    console.log(done);
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, done }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Successfully saved!");
      navigate(`/edit/${data.id}`);
    } else {
      toast.error("Error saving This Task");
    }
  };
  const handleChangeDone = (event) => {
    setDone(event.target.checked);
    console.log(event.target.checked);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
  };
  return (
    <Layout>
      <div>
        <div>
          <label>
            {" "}
            Enter name :
            <input
              id="name"
              type="text"
              onChange={handleChangeName}
              value={name}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              id="done"
              type="checkbox"
              onChange={handleChangeDone}
              value={done}
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

export default NewTask;
