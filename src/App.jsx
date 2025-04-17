import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Signup from './components/auth/Signup.jsx';
import Dashboard from './components/dashboards/Dashboard.jsx';
import FacultyList from './components/faculty/FacultyList.jsx';
import FacultyDetail from './components/faculty/FacultyDetails.jsx';
import RoleAssignment from './components/roles/RoleAssignment.jsx';
import ResponsibilityManagement from './components/responsibilities/ResponsibilityManagement.jsx';
import LandingPage from './Components/LandingPage.jsx';
import Header from './components/layouts/Header';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/faculty" element={
                <PrivateRoute>
                  <FacultyList />
                </PrivateRoute>
              } />
              <Route path="/faculty/:id" element={
                <PrivateRoute>
                  <FacultyDetail />
                </PrivateRoute>
              } />
              <Route path="/roles" element={
                <PrivateRoute>
                  <RoleAssignment />
                </PrivateRoute>
              } />
              <Route path="/responsibilities" element={
                <PrivateRoute>
                  <ResponsibilityManagement />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
