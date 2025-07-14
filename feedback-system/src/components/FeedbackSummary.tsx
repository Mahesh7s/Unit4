import React from "react";
import { useFeedback } from "../context/FeedbackContext";
import { useNavigate } from "react-router-dom";

const FeedbackSummary: React.FC = () => {
  const { feedback } = useFeedback();
  const navigate = useNavigate();

  if (!feedback.name) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <h2>Feedback Summary</h2>
      <p><strong>Name:</strong> {feedback.name}</p>
      <p><strong>Email:</strong> {feedback.email}</p>
      <p><strong>Rating:</strong> {feedback.rating}</p>
      <p><strong>Message:</strong> {feedback.message}</p>
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
};

export default FeedbackSummary;
