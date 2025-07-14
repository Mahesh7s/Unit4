import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";

const FeedbackForm: React.FC = () => {
  const { setFeedback } = useFeedback();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, rating, message } = form;
    if (!name || !email || !rating || !message) {
      alert("Please fill in all fields.");
      return;
    }

    setFeedback(form);
    navigate("/summary");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <br />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <br />
      <input name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="Rating (1-5)" required min={1} max={5} />
      <br />
      <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" required />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
