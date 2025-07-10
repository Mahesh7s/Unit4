import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useSelector } from 'react-redux';

export default function StreakHeatmap() {
  const heatmap = useSelector(state => state.streak.heatmap);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Productivity Heatmap</h3>
      <CalendarHeatmap
        startDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
        endDate={new Date()}
        values={Object.entries(heatmap).map(([date, count]) => ({ date, count }))}
      />
    </div>
  );
}