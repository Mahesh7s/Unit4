import React, { useEffect, useState } from "react";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import FilterBar from "./components/FilterBar";
import { Feedback } from "./types/feedback";
import { getFeedback } from "./utils/storage";

const App: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [keyword, setKeyword] = useState("");

  const refreshFeedback = () => {
    const all = getFeedback();
    setFeedbacks(all);
  };

  useEffect(() => {
    refreshFeedback();
  }, []);

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const avgRating =
      (fb.foodRating + fb.serviceRating + fb.cleanlinessRating) / 3;

    const matchesRating = avgRating >= minRating;

    const matchesKeyword =
      fb.name.toLowerCase().includes(keyword.toLowerCase()) ||
      (fb.comments?.toLowerCase().includes(keyword.toLowerCase()) ?? false);

    return matchesRating && matchesKeyword;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Aromatic Bar Feedback System</h1>
      <FeedbackForm onAdd={refreshFeedback} />
      <FilterBar
        minRating={minRating}
        keyword={keyword}
        onMinRatingChange={setMinRating}
        onKeywordChange={setKeyword}
      />
      <FeedbackList feedbacks={filteredFeedbacks} />
    </div>
  );
};

export default App;
