import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LogForm from '../components/LogForm';
import StreakHeatmap from '../components/StreakHeatmap';
import PDFExport from '../components/PDFExport';
import { fetchLogs } from '../redux/slices/logSlice';
import DailyNotification from '../components/DailyNotification';

export default function StudentDashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) dispatch(fetchLogs(uid));
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Welcome to MindTrack</h2>
      <DailyNotification />
      <LogForm />
      <StreakHeatmap />
      <PDFExport />
    </div>
  );
}
