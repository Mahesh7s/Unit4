// pages/AddProject.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/firebaseApi";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/projectSlice";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAdd = async () => {
    const newProject = {
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    const res = await createProject(newProject);
    dispatch(addProject({ ...newProject, id: res.name }));
  navigate(`/project/${res.name}`);


  };

  return (
    <div>
      <h2>Add Project</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <button onClick={handleAdd}>Create</button>
    </div>
  );
}
