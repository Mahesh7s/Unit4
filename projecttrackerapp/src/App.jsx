import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";

import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NavBar from './NavBar';
import PrivateRoute from './Pages/PrivateRoute';
import Dashboard from './Pages/Dashboard';

// ✅ Import new pages
import AddProject from './Pages/AddProject';
import EditProject from './Pages/EditProject';
import ProjectDetails from './Pages/ProjectDetails';

function App() {
  return (
    <>
      <NavBar />
      <h3>Welcome to Project Tracker App</h3>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/add-project" element={
          <PrivateRoute><AddProject /></PrivateRoute>
        } />
        <Route path="/edit-project/:projectId" element={
          <PrivateRoute><EditProject /></PrivateRoute>
        } />
        <Route path="/project/:projectId" element={
          <PrivateRoute><ProjectDetails /></PrivateRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
