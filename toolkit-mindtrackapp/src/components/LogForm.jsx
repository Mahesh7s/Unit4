import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

export default function LogForm() {
  const [form, setForm] = useState({
    studyHours: '',
    breakTime: '',
    sleep: '',
    stressLevel: '',
    focus: '',
    reflection: ''
  });
  const user = useSelector(state => state.auth.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, 'dailyLogs', user.uid, 'logs');
    await addDoc(ref, {
      ...form,
      timestamp: new Date().toISOString()
    });
    alert('Log submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input name="studyHours" placeholder="Study Hours" onChange={handleChange} />
      <input name="breakTime" placeholder="Break Time" onChange={handleChange} />
      <input name="sleep" placeholder="Sleep (hrs)" onChange={handleChange} />
      <input name="stressLevel" placeholder="Stress Level (1-5)" onChange={handleChange} />
      <input name="focus" placeholder="Focus (1-5)" onChange={handleChange} />
      <textarea name="reflection" placeholder="Reflection" onChange={handleChange}></textarea>
      <button type="submit">Submit Log</button>
    </form>
  );
}