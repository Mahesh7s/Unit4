import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { setStudents } from '../redux/slices/mentorSlice';

export default function MentorDashboard() {
  const dispatch = useDispatch();
  const students = useSelector(state => state.mentor.students);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(s => s.role === 'student');
      dispatch(setStudents(data));
    };
    fetchStudents();
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Student Logs</h2>
      {students.map(student => (
        <div key={student.id} className="my-2 border p-2 rounded">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Streak:</strong> {student.streak} days</p>
        </div>
      ))}
    </div>
  );
}