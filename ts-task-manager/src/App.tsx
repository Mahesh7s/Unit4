import React, { useState } from "react";
import { Task, Priority } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

  const addTask = (description: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskFilter filter={filter} onChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={toggleComplete} />
    </div>
  );
};

export default App;
