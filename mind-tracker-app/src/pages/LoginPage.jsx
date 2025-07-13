import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useAuth(); // ✅ Use the context login function

  const handleLogin = async () => {
    setError('');
    try {
      await loginUser(form.email, form.password); // ✅ Let AuthContext handle auth
      // ✅ No need to manually navigate — App.jsx will redirect based on user/role
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        className="w-full mb-4 p-2 border rounded"
      />
      
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <p className="text-sm mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
