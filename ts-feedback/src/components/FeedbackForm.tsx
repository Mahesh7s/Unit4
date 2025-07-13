import React, { useState } from "react";
import { Feedback, Rating } from "../types/feedback";
import { saveFeedback } from "../utils/storage";

interface Props {
  onAdd: () => void;
}

const FeedbackForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Omit<Feedback, "id">>({
    name: "",
    email: "",
    date: "",
    foodRating: Rating.THREE,
    serviceRating: Rating.THREE,
    cleanlinessRating: Rating.THREE,
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.foodRating || !form.serviceRating || !form.cleanlinessRating) {
      alert("Please fill all required fields.");
      return;
    }

    const newFeedback: Feedback = {
      ...form,
      id: crypto.randomUUID(),
      foodRating: Number(form.foodRating),
      serviceRating: Number(form.serviceRating),
      cleanlinessRating: Number(form.cleanlinessRating),
    };

    saveFeedback(newFeedback);
    alert("Thank you for your feedback!");
    setForm({
      name: "",
      email: "",
      date: "",
      foodRating: Rating.THREE,
      serviceRating: Rating.THREE,
      cleanlinessRating: Rating.THREE,
      comments: "",
    });

    onAdd(); // refresh feedback list
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Submit Feedback</h2>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
      <br />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
      <br />
      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <br />
      <label>Food Rating:</label>
      <select name="foodRating" value={form.foodRating} onChange={handleChange}>
        {Object.values(Rating).filter((v) => typeof v === "number").map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <br />
      <label>Service Rating:</label>
      <select name="serviceRating" value={form.serviceRating} onChange={handleChange}>
        {Object.values(Rating).filter((v) => typeof v === "number").map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <br />
      <label>Cleanliness Rating:</label>
      <select name="cleanlinessRating" value={form.cleanlinessRating} onChange={handleChange}>
        {Object.values(Rating).filter((v) => typeof v === "number").map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <br />
      <textarea name="comments" value={form.comments} onChange={handleChange} placeholder="Additional comments..." />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
