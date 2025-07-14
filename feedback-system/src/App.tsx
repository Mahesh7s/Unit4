import React from "react";
import AppRouter from "./routes/AppRouter";
import { FeedbackProvider } from "./context/FeedbackContext";

const App = () => {
  return (
    <FeedbackProvider>
      <div style={{ padding: "20px" }}>
        <h1>Feedback System</h1>
        <AppRouter />
      </div>
    </FeedbackProvider>
  );
};

export default App;
