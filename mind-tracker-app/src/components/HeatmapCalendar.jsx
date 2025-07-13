import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ref, get } from 'firebase/database';
import { format, subDays } from 'date-fns';

const HeatmapCalendar = () => {
  const { user } = useAuth();
  const [activityMap, setActivityMap] = useState({});

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;

      try {
        const snap = await get(ref(db, `logs/${user.uid}`));
        if (snap.exists()) {
          const data = snap.val();
          const map = {};
          for (let date in data) {
            map[date] = true; // could be extended to count-based intensity
          }
          setActivityMap(map);
        }
      } catch (err) {
        console.error('❌ Error loading heatmap:', err);
      }
    };

    fetchLogs();
  }, [user]);

  const today = new Date();
  const daysToShow = 42; // 6 weeks

  const days = Array.from({ length: daysToShow }, (_, i) => {
    const date = subDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
      date,
      key: dateStr,
      active: activityMap[dateStr],
    };
  }).reverse(); // so calendar flows left → right

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h3 className="text-lg font-semibold mb-2">📅 Activity Heatmap</h3>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day.key}
            title={day.key}
            className={`w-6 h-6 rounded-sm ${
              day.active ? 'bg-green-600' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">Last {daysToShow} days of activity</p>
    </div>
  );
};

export default HeatmapCalendar;
