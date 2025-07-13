import { useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';
import jsPDF from 'jspdf';

const ExportLogsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState('');

  const handleExport = async () => {
    if (!month) return alert('Please select a month');

    setLoading(true);
    try {
      const snap = await get(ref(db, `logs/${user.uid}`));
      if (!snap.exists()) return alert('No logs found.');

      const logs = snap.val();
      const filteredLogs = Object.entries(logs).filter(([date]) =>
        date.startsWith(month) // e.g. "2025-07"
      );

      if (filteredLogs.length === 0) {
        return alert('No logs for this month.');
      }

      const doc = new jsPDF();
      doc.setFontSize(14);
      doc.text(`MindTrack Journal - ${month}`, 10, 10);

      let y = 20;
      filteredLogs.forEach(([date, log], index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Date: ${date}`, 10, y);
        y += 6;
        doc.text(`   📚 Study Hours: ${log.studyHours || '-'}`, 10, y);
        y += 6;
        doc.text(`   😴 Sleep: ${log.sleepHours || '-'}`, 10, y);
        y += 6;
        doc.text(`   😌 Stress: ${log.stressLevel || '-'}`, 10, y);
        y += 6;
        doc.text(`   🧠 Focus: ${log.focusLevel || '-'}`, 10, y);
        y += 6;
        doc.text(`   ✍️ Reflection: ${log.reflection?.slice(0, 60) || '-'}`, 10, y);
        y += 10;

        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save(`mindtrack-journal-${month}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Failed to export logs.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">📤 Export Monthly Logs</h2>

      <label className="block mb-2 font-semibold">Select Month (YYYY-MM):</label>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      <button
        onClick={handleExport}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
        disabled={loading}
      >
        {loading ? 'Generating PDF...' : 'Download PDF'}
      </button>
    </div>
  );
};

export default ExportLogsPage;
