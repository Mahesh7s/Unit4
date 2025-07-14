import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../redux/feedback/feedbackSlice';
import { Feedback } from '../types';
import { v4 as uuid } from 'uuid';

const FeedbackForm: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    rating: 1,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: Feedback = {
      ...form,
      id: uuid(),
      date: new Date().toISOString(),
    };
    dispatch(addFeedback(newFeedback));
    setForm({ name: '', email: '', rating: 1, message: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 20, margin: 20 }}>
      <h3>Add Feedback</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <br />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <br />
      <input name="rating" type="number" value={form.rating} onChange={handleChange} min={1} max={5} />
      <br />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
