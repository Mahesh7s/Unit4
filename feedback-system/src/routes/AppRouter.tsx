import React from "react";
import { Routes, Route } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackSummary from "../components/FeedbackSummary";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedbackForm />} />
      <Route path="/summary" element={<FeedbackSummary />} />
    </Routes>
  );
};

export default AppRouter;
