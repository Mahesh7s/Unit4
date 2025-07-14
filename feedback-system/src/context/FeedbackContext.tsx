import React, { createContext, useContext, useState, ReactNode } from "react";
import { FeedbackData } from "../types/feedback";

interface FeedbackContextType {
  feedback: FeedbackData;
  setFeedback: (data: FeedbackData) => void;
}

const defaultFeedback: FeedbackData = {
  name: "",
  email: "",
  rating: 0,
  message: "",
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [feedback, setFeedback] = useState<FeedbackData>(defaultFeedback);

  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }
  return context;
};
