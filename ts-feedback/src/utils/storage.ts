import { Feedback } from "../types/feedback";

const FEEDBACK_KEY = "feedback-data";

export const saveFeedback = (data: Feedback) => {
  const current = getFeedback();
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify([...current, data]));
};

export const getFeedback = (): Feedback[] => {
  const data = localStorage.getItem(FEEDBACK_KEY);
  return data ? JSON.parse(data) : [];
};
