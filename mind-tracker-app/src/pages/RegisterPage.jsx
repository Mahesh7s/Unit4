import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../services/firebase';
import { useNavigate, Link } from 'react-router-dom';

import { signOut } from 'firebase/auth'
const RegisterPage = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const uid = userCred.user.uid;

      await set(ref(db, `users/${uid}`), {
        email: form.email,
        role: form.role,
      });
	   await signOut(auth); 

    navigate("/")


    } catch (err) {
      setError('Registration failed. Try a stronger password.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />
      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
      </select>

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
      </button>

      <p className="text-sm mt-4 text-center">
        Already have an account?{' '}
        <Link to="/" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
