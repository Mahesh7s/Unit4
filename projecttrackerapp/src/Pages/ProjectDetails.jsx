import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTasksByProject,
  createTask,
  deleteTask,
  updateTask,
} from "../services/firebaseApi";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editData, setEditData] = useState({ title: "", priority: "medium", completed: false });

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await getTasksByProject(projectId);
      const parsed = res
        ? Object.entries(res).map(([id, task]) => ({ id, ...task }))
        : [];
      setTasks(parsed);
    };
    fetchTasks();
  }, [projectId]);

  const handleAddTask = async () => {
    if (!taskTitle.trim()) return;
    const newTask = {
      title: taskTitle,
      completed: false,
      priority,
    };
    const res = await createTask(projectId, newTask);
    setTasks((prev) => [...prev, { ...newTask, id: res.name }]);
    setTaskTitle("");
    setPriority("medium");
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(projectId, taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditData({
      title: task.title,
      priority: task.priority,
      completed: task.completed,
    });
  };

  const handleSaveEdit = async () => {
    await updateTask(projectId, editingTaskId, editData);
    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId ? { ...t, ...editData } : t
      )
    );
    setEditingTaskId(null);
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* New Task Form */}
      <input
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="New Task Title"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
                <select
                  value={editData.priority}
                  onChange={(e) =>
                    setEditData({ ...editData, priority: e.target.value })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <label>
                  <input
                    type="checkbox"
                    checked={editData.completed}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        completed: e.target.checked,
                      })
                    }
                  />
                  Completed
                </label>
                <button onClick={handleSaveEdit}>💾 Save</button>
              </div>
            ) : (
              <>
                <strong>{task.title}</strong> | Priority: {task.priority} |{" "}
                Status: {task.completed ? "✅" : "⏳"}
                <button onClick={() => handleStartEdit(task)}>✏️ Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>❌</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
