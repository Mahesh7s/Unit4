import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import Insights from './pages/Insights';

function PrivateRoute({ children, role }) {
  const auth = useSelector(state => state.auth);
  if (!auth.isAuthenticated) return <Navigate to="/login" />;
  if (role && auth.user?.role !== role) return <Navigate to="/unauthorized" />;
  return children;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/student" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
          <Route path="/mentor" element={<PrivateRoute role="mentor"><MentorDashboard /></PrivateRoute>} />
          <Route path="/insights" element={<PrivateRoute role="student"><Insights /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/student" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;