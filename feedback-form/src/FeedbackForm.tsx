import React, { useState } from "react";
import { FeedbackData } from "./types";

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, rating, message } = formData;

    if (!name || !email || !rating || !message) {
      alert("Please fill all fields before submitting.");
      return;
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", rating: 0, message: "" });
    setSubmitted(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Feedback</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={formData.rating}
            onChange={handleChange}
            min={1}
            max={5}
            required
          />
          <br />
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h3>Thank you for your feedback!</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Rating:</strong> {formData.rating}</p>
          <p><strong>Feedback:</strong> {formData.message}</p>
          <button onClick={handleReset}>Submit New Feedback</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
