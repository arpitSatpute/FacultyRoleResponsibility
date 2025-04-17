import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Dashboard() {
  const { currentUser } = useAuth();
  
  // These would come from API in a real app
  const stats = {
    totalFaculty: 28,
    activeRoles: 12,
    pendingTasks: 5,
    upcomingDeadlines: 3
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="welcome-message">
        <h2>Welcome back, {currentUser.name}!</h2>
        <p>Here's an overview of faculty roles and responsibilities</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Faculty</h3>
          <p className="stat-value">{stats.totalFaculty}</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Roles</h3>
          <p className="stat-value">{stats.activeRoles}</p>
        </div>
        
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p className="stat-value">{stats.pendingTasks}</p>
        </div>
        
        <div className="stat-card">
          <h3>Upcoming Deadlines</h3>
          <p className="stat-value">{stats.upcomingDeadlines}</p>
        </div>
      </div>
      
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Recent Activity</h3>
          <ul className="activity-list">
            <li>
              <span className="activity-time">2 hours ago</span>
              <span className="activity-text">Prof. Smith assigned to Curriculum Committee</span>
            </li>
            <li>
              <span className="activity-time">5 hours ago</span>
              <span className="activity-text">Dr. Johnson submitted research report</span>
            </li>
            <li>
              <span className="activity-time">Yesterday</span>
              <span className="activity-text">Department meeting minutes uploaded</span>
            </li>
            <li>
              <span className="activity-time">2 days ago</span>
              <span className="activity-text">New role created: Outreach Coordinator</span>
            </li>
          </ul>
        </div>
        
        <div className="dashboard-section">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="action-button">Add New Faculty</button>
            <button className="action-button">Assign Role</button>
            <button className="action-button">Create Task</button>
            <button className="action-button">Generate Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
