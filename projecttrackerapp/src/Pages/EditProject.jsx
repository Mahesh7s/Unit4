import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProjects, updateProject } from "../services/firebaseApi";
import { useDispatch } from "react-redux";
import { updateProject as updateRedux } from "../redux/projectSlice";

export default function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      const all = await getAllProjects();
      const current = all?.[projectId];
      if (current) {
        setTitle(current.title);
        setDescription(current.description);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleUpdate = async () => {
    const updatedProject = { title, description };
    await updateProject(projectId, updatedProject);
    dispatch(updateRedux({ id: projectId, ...updatedProject }));
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
