import React from "react"

import { useContext, useState } from "react";
import { UserContext } from "./Context";

export default function Settings() {
  const { user, updateUser } = useContext(UserContext);
  const [form, setForm] = useState({ name: user.name, email: user.email });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
    alert("User updated!");
  };

  return (
    <div>
      <h2>⚙️ Settings Page</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
