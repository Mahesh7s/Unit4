import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const FeedbackList: React.FC = () => {
  const feedbacks = useSelector((state: RootState) => state.feedback.entries);

  return (
    <div style={{ padding: 20 }}>
      <h3>All Feedbacks</h3>
      {feedbacks.map((f) => (
        <div key={f.id} style={{ borderBottom: '1px solid #eee', marginBottom: 10 }}>
          <p><strong>{f.name}</strong> ({f.rating}/5)</p>
          <p>{f.message}</p>
          <p style={{ fontSize: '0.8em' }}>{new Date(f.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
