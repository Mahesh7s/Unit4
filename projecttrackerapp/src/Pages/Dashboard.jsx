// pages/Dashboard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjects,
  deleteProject as deleteProjectApi,
} from "../services/firebaseApi";
import {
  setProjects,
  deleteProject as deleteProjectRedux,
} from "../redux/projectSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.projects);

  // 🔄 Load projects once on mount
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getAllProjects();
      const parsed = res
        ? Object.entries(res).map(([id, project]) => ({ id, ...project }))
        : [];
      dispatch(setProjects(parsed));
    };
    fetchProjects();
  }, [dispatch]);

  // 🧹 Delete handler
  const handleDelete = async (projectId) => {
    await deleteProjectApi(projectId);
    dispatch(deleteProjectRedux(projectId));
  };

  return (
    <div>
      <h1>📋 All Projects</h1>

      <button onClick={() => navigate("/add-project")}>➕ Add Project</button>

      <div style={{ marginTop: "1rem" }}>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id}>
                <strong>{project.title}</strong> - {project.description}
                <br />
                <button onClick={() => navigate(`/project/${project.id}`)}>
                  📂 View Tasks
                </button>
                <button onClick={() => navigate(`/edit-project/${project.id}`)}>
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(project.id)}>❌ Delete</button>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
