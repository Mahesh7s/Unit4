import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const FeedbackChart = () => {
  const feedbacks = useSelector((state: RootState) => state.feedback.entries);

  const ratingCounts = [0, 0, 0, 0, 0];
  feedbacks.forEach((f) => {
    if (f.rating >= 1 && f.rating <= 5) {
      ratingCounts[f.rating - 1]++;
    }
  });

  const data = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Feedbacks',
        data: ratingCounts,
        backgroundColor: '#3182ce',
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Feedback Rating Chart</h3>
      <Bar data={data} />
    </div>
  );
};

export default FeedbackChart;
