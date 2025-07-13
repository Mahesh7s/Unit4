import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/firebase';
import { ref, set, get } from 'firebase/database';
import HeatmapCalendar from '../components/HeatmapCalendar';
import { generateInsights } from '../services/insightEngine';
import Navbar from '../components/Navbar';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    studyHours: '',
    breakTime: '',
    sleepHours: '',
    stressLevel: '',
    focusLevel: '',
    reflection: '',
    public: true,
  });

  const [logs, setLogs] = useState([]);
  const [insights, setInsights] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const snap = await get(ref(db, `logs/${user.uid}`));
        if (snap.exists()) {
          const data = snap.val();
          const entries = Object.entries(data)
            .map(([date, value]) => ({ date, ...value }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
          setLogs(entries);
          if (entries.length >= 7) {
            const last7 = entries.slice(-7);
            setInsights(generateInsights(last7));
          }
        }
      } catch (err) {
        console.error('Error fetching logs', err);
      }
    };
    fetchLogs();
  }, [user.uid]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await set(ref(db, `logs/${user.uid}/${today}`), {
        ...form,
        timestamp: Date.now(),
      });
      alert('✅ Log saved!');
      setForm({
        studyHours: '',
        breakTime: '',
        sleepHours: '',
        stressLevel: '',
        focusLevel: '',
        reflection: '',
        public: true,
      });
    } catch (err) {
      alert('❌ Failed to save log');
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">🧠 Daily Journal — {today}</h2>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="studyHours" placeholder="Study Hours" value={form.studyHours} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="breakTime" placeholder="Break Time (hrs)" value={form.breakTime} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="sleepHours" placeholder="Sleep Hours" value={form.sleepHours} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="stressLevel" placeholder="Stress (1–10)" value={form.stressLevel} onChange={handleChange} className="border p-2 rounded" />
          <input type="number" name="focusLevel" placeholder="Focus (1–10)" value={form.focusLevel} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <textarea name="reflection" placeholder="Write reflection (markdown supported)" rows="4" value={form.reflection} onChange={handleChange} className="w-full border mt-4 p-2 rounded" />

        <label className="inline-flex items-center mt-2">
          <input type="checkbox" name="public" checked={form.public} onChange={handleChange} className="mr-2" />
          Make this log visible to mentor
        </label>

        <button onClick={handleSubmit} className="bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700">
          Save Log
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        <HeatmapCalendar />

        {insights.length > 0 && (
          <div className="mt-6 bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold mb-2">💡 Personalized Insights</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {insights.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentDashboard;
