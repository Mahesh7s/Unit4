import React from "react";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <strong>[{task.priority}]</strong> {task.description} -{" "}
          {task.completed ? "✅" : "❌"}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
