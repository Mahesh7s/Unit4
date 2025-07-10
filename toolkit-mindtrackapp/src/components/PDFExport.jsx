import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React from 'react';
import { useSelector } from 'react-redux';

export default function PDFExport() {
  const logs = useSelector(state => state.logs.dailyLogs);

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text('MindTrack Journal Export', 14, 10);
    const tableData = logs.map(log => [log.timestamp.slice(0, 10), log.studyHours, log.sleep, log.focus, log.stressLevel]);
    doc.autoTable({ head: [['Date', 'Study Hours', 'Sleep', 'Focus', 'Stress']], body: tableData });
    doc.save('mindtrack_journal.pdf');
  };

  return (
    <button onClick={handleExport} className="p-2 bg-blue-500 text-white rounded">Download PDF Summary</button>
  );
}