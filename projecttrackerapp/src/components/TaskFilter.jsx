// components/TaskFilter.jsx
export default function TaskFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <label>
        Priority:
        <select name="priority" value={filters.priority} onChange={handleChange}>
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label style={{ marginLeft: "1rem" }}>
        Completion:
        <select name="completed" value={filters.completed} onChange={handleChange}>
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </select>
      </label>
    </div>
  );
}
