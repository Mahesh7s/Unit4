import React from "react";
import { Feedback } from "../types/feedback";

interface Props {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<Props> = ({ feedbacks }) => {
  if (feedbacks.length === 0) return <p>No feedback available.</p>;

  return (
    <div>
      <h2>Feedback Submissions</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Visit Date</th>
            <th>Food</th>
            <th>Service</th>
            <th>Cleanliness</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb.id}>
              <td>{fb.name}</td>
              <td>{fb.email}</td>
              <td>{fb.date || "N/A"}</td>
              <td>{fb.foodRating}</td>
              <td>{fb.serviceRating}</td>
              <td>{fb.cleanlinessRating}</td>
              <td>{fb.comments || "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
