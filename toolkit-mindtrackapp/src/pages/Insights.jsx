// === Insights.jsx ===
import React from 'react';
import { useSelector } from 'react-redux';
import { generateInsights } from '../utils/insightEngine';

export default function Insights() {
  const logs = useSelector(state => state.logs.dailyLogs);
  const insights = logs.length >= 7 ? generateInsights(logs) : [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Weekly Insights</h2>
      {insights.length > 0 ? (
        <ul className="list-disc list-inside">
          {insights.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      ) : (
        <p>You need at least 7 logs to get insights. Keep going!</p>
      )}
    </div>
  );
}
