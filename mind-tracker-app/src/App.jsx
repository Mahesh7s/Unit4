import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <Routes>
      {/* Default route redirect based on login & role */}
      <Route
  path="/"
  element={
    user ? (
      role === 'mentor' ? (
        <Navigate to="/mentor" />
      ) : (
        <Navigate to="/student" />
      )
    ) : (
      <LoginPage />
    )
  }
/>


      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentor"
        element={
          <ProtectedRoute allowedRole="mentor">
            <MentorDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
