import { useEffect, useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { db } from '../services/firebase';
import Navbar from '../components/Navbar';

const MentorDashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchPublicLogs = async () => {
      try {
        const usersSnap = await get(ref(db, 'users'));
        const userList = usersSnap.exists() ? Object.entries(usersSnap.val()) : [];

        const publicLogs = [];

        for (const [uid, userMeta] of userList) {
          const logSnap = await get(ref(db, `logs/${uid}`));
          if (logSnap.exists()) {
            const logsByDate = logSnap.val();
            for (const date in logsByDate) {
              const entry = logsByDate[date];
              if (entry.public) {
                publicLogs.push({
                  uid,
                  email: userMeta.email || '',
                  date,
                  ...entry,
                });
              }
            }
          }
        }

        // Sort by newest first
        publicLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLogs(publicLogs);
      } catch (err) {
        console.error('Error fetching public logs:', err);
      }
    };

    fetchPublicLogs();
  }, []);

  const handleMentorComment = async (uid, date, comment) => {
    try {
      await set(ref(db, `logs/${uid}/${date}/mentorComment`), comment);
      alert('✅ Feedback saved!');
    } catch (err) {
      alert('❌ Failed to save feedback');
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto mt-6 p-4">
        <h2 className="text-2xl font-bold mb-4">👩‍🏫 Mentor Dashboard</h2>

        {logs.length === 0 ? (
          <p className="text-gray-600">No public logs available.</p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="bg-white p-4 mb-4 shadow rounded">
              <h3 className="font-semibold text-blue-600">{log.email}</h3>
              <p className="text-sm text-gray-500">📅 {log.date}</p>

              <div className="mt-2 space-y-1 text-sm">
                <p>📚 <strong>Study Hours:</strong> {log.studyHours}</p>
                <p>🧘 <strong>Break Time:</strong> {log.breakTime}</p>
                <p>😴 <strong>Sleep:</strong> {log.sleepHours}</p>
                <p>😌 <strong>Stress Level:</strong> {log.stressLevel}</p>
                <p>🧠 <strong>Focus Level:</strong> {log.focusLevel}</p>
                <p>✍️ <strong>Reflection:</strong> {log.reflection}</p>
              </div>

              <textarea
                defaultValue={log.mentorComment || ''}
                onBlur={(e) => handleMentorComment(log.uid, log.date, e.target.value)}
                placeholder="Leave a positive comment or suggestion"
                className="w-full mt-3 p-2 border rounded"
                rows={2}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MentorDashboard;
