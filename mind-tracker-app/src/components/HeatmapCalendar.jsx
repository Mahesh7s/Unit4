import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { subDays, format } from 'date-fns';

const HeatmapCalendar = () => {
  const { user } = useAuth();
  const [logDates, setLogDates] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const snap = await get(ref(db, `logs/${user.uid}`));
        if (snap.exists()) {
          const logs = snap.val();
          const dates = Object.keys(logs);
          const heatmapData = dates.map((date) => ({
            date,
            count: 1, // All logged days have count 1
          }));
          setLogDates(heatmapData);
        }
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };

    fetchLogs();
  }, [user.uid]);

  const endDate = new Date();
  const startDate = subDays(endDate, 60); // Show last 60 days

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-2">🔥 Productivity Streak</h3>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={logDates}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return 'color-scale-1';
        }}
        showWeekdayLabels={true}
        tooltipDataAttrs={(value) => {
          if (value.date) {
            return {
              'data-tip': `✅ Logged on ${format(new Date(value.date), 'MMM d')}`,
            };
          }
          return {
            'data-tip': 'No entry',
          };
        }}
      />
    </div>
  );
};

export default HeatmapCalendar;
