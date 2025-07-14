import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackChart from './charts/FeedbackChart';

const App: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial', padding: 20 }}>
      <h1>Advanced Feedback System</h1>
      <FeedbackForm />
      <FeedbackChart />
      <FeedbackList />
    </div>
  );
};

export default App;
