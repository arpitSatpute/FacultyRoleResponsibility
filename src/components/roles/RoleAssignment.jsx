// src/components/responsibilities/ResponsibilityManagement.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function ResponsibilityManagement() {
  const { currentUser } = useAuth();
  const [responsibilities, setResponsibilities] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [assignForm, setAssignForm] = useState({
    responsibilityId: '',
    facultyId: '',
    startDate: '',
    endDate: ''
  });

  // Load mock data
  useEffect(() => {
    // In a real app, these would come from API calls
    const mockResponsibilities = [
      {
        id: '1',
        title: 'Curriculum Review',
        description: 'Review and update course materials for the upcoming semester',
        priority: 'high',
        assignments: [
          { id: '101', facultyId: '1', facultyName: 'Dr. Brown', startDate: '2025-05-01', endDate: '2025-05-15' }
        ]
      },
      {
        id: '2',
        title: 'Student Advising',
        description: 'Meet with assigned students for academic advising',
        priority: 'medium',
        assignments: [
          { id: '102', facultyId: '2', facultyName: 'Prof. Smith', startDate: '2025-04-20', endDate: '2025-05-10' }
        ]
      },
      {
        id: '3',
        title: 'Department Meeting',
        description: 'Prepare and attend monthly department meetings',
        priority: 'low',
        assignments: []
      }
    ];

    const mockFaculty = [
      { id: '1', name: 'Dr. Brown', department: 'Computer Science' },
      { id: '2', name: 'Prof. Smith', department: 'Mathematics' },
      { id: '3', name: 'Dr. Johnson', department: 'Physics' },
      { id: '4', name: 'Prof. Williams', department: 'Chemistry' }
    ];

    setResponsibilities(mockResponsibilities);
    setFaculty(mockFaculty);
  }, []);

  const handleNewResponsibilityChange = (e) => {
    const { name, value } = e.target;
    setNewResponsibility(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignFormChange = (e) => {
    const { name, value } = e.target;
    setAssignForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResponsibility = (e) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now().toString(),
      ...newResponsibility,
      assignments: []
    };
    
    setResponsibilities(prev => [...prev, newItem]);
    setNewResponsibility({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
    setShowAddForm(false);
  };

  const handleAssignResponsibility = (e) => {
    e.preventDefault();
    
    const updatedResponsibilities = responsibilities.map(resp => {
      if (resp.id === assignForm.responsibilityId) {
        const facultyMember = faculty.find(f => f.id === assignForm.facultyId);
        const newAssignment = {
          id: Date.now().toString(),
          facultyId: assignForm.facultyId,
          facultyName: facultyMember.name,
          startDate: assignForm.startDate,
          endDate: assignForm.endDate
        };
        
        return {
          ...resp,
          assignments: [...resp.assignments, newAssignment]
        };
      }
      return resp;
    });
    
    setResponsibilities(updatedResponsibilities);
    setAssignForm({
      responsibilityId: '',
      facultyId: '',
      startDate: '',
      endDate: ''
    });
    setShowAssignForm(false);
  };

  const deleteAssignment = (responsibilityId, assignmentId) => {
    const updatedResponsibilities = responsibilities.map(resp => {
      if (resp.id === responsibilityId) {
        return {
          ...resp,
          assignments: resp.assignments.filter(assign => assign.id !== assignmentId)
        };
      }
      return resp;
    });
    
    setResponsibilities(updatedResponsibilities);
  };

  const deleteResponsibility = (responsibilityId) => {
    setResponsibilities(prev => 
      prev.filter(resp => resp.id !== responsibilityId)
    );
  };

  return (
    <div className="responsibility-container">
      <div className="responsibility-header">
        <h1>Responsibility Management</h1>
        <div className="responsibility-actions">
          <button 
            className="action-button primary" 
            onClick={() => setShowAddForm(true)}
          >
            Add New Responsibility
          </button>
          <button 
            className="action-button secondary" 
            onClick={() => setShowAssignForm(true)}
          >
            Assign Responsibility
          </button>
        </div>
      </div>

      {/* Modal for adding new responsibility */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Responsibility</h2>
              <button 
                className="close-button" 
                onClick={() => setShowAddForm(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddResponsibility}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newResponsibility.title}
                  onChange={handleNewResponsibilityChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newResponsibility.description}
                  onChange={handleNewResponsibilityChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={newResponsibility.dueDate}
                  onChange={handleNewResponsibilityChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={newResponsibility.priority}
                  onChange={handleNewResponsibilityChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">Add Responsibility</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for assigning responsibility */}
      {showAssignForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Assign Responsibility</h2>
              <button 
                className="close-button" 
                onClick={() => setShowAssignForm(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAssignResponsibility}>
              <div className="form-group">
                <label htmlFor="responsibilityId">Responsibility</label>
                <select
                  id="responsibilityId"
                  name="responsibilityId"
                  value={assignForm.responsibilityId}
                  onChange={handleAssignFormChange}
                  required
                >
                  <option value="">Select Responsibility</option>
                  {responsibilities.map(resp => (
                    <option key={resp.id} value={resp.id}>
                      {resp.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="facultyId">Faculty Member</label>
                <select
                  id="facultyId"
                  name="facultyId"
                  value={assignForm.facultyId}
                  onChange={handleAssignFormChange}
                  required
                >
                  <option value="">Select Faculty</option>
                  {faculty.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.department}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={assignForm.startDate}
                  onChange={handleAssignFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={assignForm.endDate}
                  onChange={handleAssignFormChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">Assign</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAssignForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsibilities List */}
      <div className="responsibilities-list">
        {responsibilities.length === 0 ? (
          <p className="no-items">No responsibilities found. Add some to get started.</p>
        ) : (
          responsibilities.map(responsibility => (
            <div className="responsibility-card" key={responsibility.id}>
              <div className="responsibility-card-header">
                <h3>{responsibility.title}</h3>
                <div className={`priority-badge ${responsibility.priority}`}>
                  {responsibility.priority}
                </div>
              </div>
              <p className="responsibility-description">{responsibility.description}</p>
              {responsibility.dueDate && (
                <p className="responsibility-due-date">
                  <strong>Due:</strong> {new Date(responsibility.dueDate).toLocaleDateString()}
                </p>
              )}
              
              <div className="assignments-section">
                <h4>Assigned Faculty</h4>
                {responsibility.assignments.length === 0 ? (
                  <p className="no-assignments">No faculty assigned yet</p>
                ) : (
                  <ul className="assignments-list">
                    {responsibility.assignments.map(assignment => (
                      <li key={assignment.id} className="assignment-item">
                        <div className="assignment-info">
                          <span className="faculty-name">{assignment.facultyName}</span>
                          <span className="assignment-dates">
                            {new Date(assignment.startDate).toLocaleDateString()} - 
                            {new Date(assignment.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <button 
                          className="delete-button small"
                          onClick={() => deleteAssignment(responsibility.id, assignment.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="responsibility-actions">
                <button 
                  className="delete-button"
                  onClick={() => deleteResponsibility(responsibility.id)}
                >
                  Delete Responsibility
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ResponsibilityManagement;