import React from "react";

interface TaskFilterProps {
  filter: "all" | "completed" | "incomplete";
  onChange: (value: "all" | "completed" | "incomplete") => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onChange }) => {
  return (
    <div>
      <button onClick={() => onChange("all")} disabled={filter === "all"}>
        All
      </button>
      <button onClick={() => onChange("completed")} disabled={filter === "completed"}>
        Completed
      </button>
      <button onClick={() => onChange("incomplete")} disabled={filter === "incomplete"}>
        Incomplete
      </button>
    </div>
  );
};

export default TaskFilter;
