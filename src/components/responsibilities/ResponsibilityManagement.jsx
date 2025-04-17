import React, { useState, useEffect } from 'react';

function ResponsibilityManagement() {
  const [responsibilities, setResponsibilities] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'Medium'
  });
  const [responsibilityAssignment, setResponsibilityAssignment] = useState({
    responsibilityId: '',
    facultyId: ''
  });

  // In a real app, this would come from an API
  useEffect(() => {
    // Mock responsibilities data
    const mockResponsibilities = [
      {
        id: '1',
        title: 'Course Development',
        description: 'Design new curriculum for upcoming semester',
        deadline: '2025-06-30',
        priority: 'High',
        assignedFaculty: ['1', '2']
      },
      {
        id: '2',
        title: 'Student Mentoring',
        description: 'Mentor assigned students for academic and career guidance',
        deadline: '2025-12-15',
        priority: 'Medium',
        assignedFaculty: ['3']
      },
      {
        id: '3',
        title: 'Research Supervision',
        description: 'Supervise graduate student research projects',
        deadline: '2025-08-15',
        priority: 'High',
        assignedFaculty: ['1', '4']
      },
      {
        id: '4',
        title: 'Department Meetings',
        description: 'Attend and contribute to regular department meetings',
        deadline: 'Ongoing',
        priority: 'Low',
        assignedFaculty: ['1', '2', '3', '4']
      },
      {
        id: '5',
        title: 'Budget Planning',
        description: 'Participate in department budget planning process',
        deadline: '2025-05-01',
        priority: 'Medium',
        assignedFaculty: ['1']
      }
    ];
    
    // Mock faculty data
    const mockFaculty = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        department: 'Computer Science'
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        department: 'Mathematics'
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        department: 'Engineering'
      },
      {
        id: '4',
        name: 'Prof. James Wilson',
        department: 'Physics'
      }
    ];
    
    setResponsibilities(mockResponsibilities);
    setFaculty(mockFaculty);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResponsibility(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddResponsibility = () => {
    const responsibilityWithId = {
      ...newResponsibility,
      id: Date.now().toString(),
      assignedFaculty: []
    };
    
    setResponsibilities(prev => [...prev, responsibilityWithId]);
    setNewResponsibility({
      title: '',
      description: '',
      deadline: '',
      priority: 'Medium'
    });
    setIsAddModalOpen(false);
  };

  const handleRemoveResponsibility = (id) => {
    if (window.confirm('Are you sure you want to remove this responsibility?')) {
      setResponsibilities(prev => prev.filter(responsibility => responsibility.id !== id));
    }
  };

  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setResponsibilityAssignment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAssignResponsibility = () => {
    const { responsibilityId, facultyId } = responsibilityAssignment;
    
    if (!responsibilityId || !facultyId) {
      alert('Please select both a responsibility and a faculty member');
      return;
    }
    
    setResponsibilities(prev => prev.map(responsibility => {
      if (responsibility.id === responsibilityId) {
        // Check if already assigned
        if (!responsibility.assignedFaculty.includes(facultyId)) {
          return {
            ...responsibility,
            assignedFaculty: [...responsibility.assignedFaculty, facultyId]
          };
        }
      }
      return responsibility;
    }));
    
    setResponsibilityAssignment({
      responsibilityId: '',
      facultyId: ''
    });
    setIsAssignModalOpen(false);
  };

  const handleRemoveAssignment = (responsibilityId, facultyId) => {
    setResponsibilities(prev => prev.map(responsibility => {
      if (responsibility.id === responsibilityId) {
        return {
          ...responsibility,
          assignedFaculty: responsibility.assignedFaculty.filter(id => id !== facultyId)
        };
      }
      return responsibility;
    }));
  };

  // Get faculty name by ID
  const getFacultyName = (id) => {
    const found = faculty.find(f => f.id === id);
    return found ? found.name : 'Unknown';
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  return (
    <div className="responsibilities-container">
      <div className="responsibilities-header">
        <h1>Responsibility Management</h1>
        <div className="responsibilities-actions">
          <button 
            className="assign-responsibility-btn"
            onClick={() => setIsAssignModalOpen(true)}
          >
            Assign Responsibility
          </button>
          <button 
            className="add-responsibility-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Responsibility
          </button>
        </div>
      </div>

      {responsibilities.length === 0 ? (
        <div className="no-responsibilities-message">
          <p>No responsibilities have been created yet. Create your first responsibility!</p>
        </div>
      ) : (
        <div className="responsibilities-list">
          {responsibilities.map(responsibility => (
            <div key={responsibility.id} className="responsibility-card">
              <div className="responsibility-header">
                <h3>{responsibility.title}</h3>
                <span className={`priority-badge ${getPriorityClass(responsibility.priority)}`}>
                  {responsibility.priority}
                </span>
                <button 
                  className="remove-responsibility-btn"
                  onClick={() => handleRemoveResponsibility(responsibility.id)}
                >
                  Remove
                </button>
              </div>
              
              <div className="responsibility-details">
                <p><strong>Description:</strong> {responsibility.description}</p>
                <p><strong>Deadline:</strong> {responsibility.deadline}</p>
              </div>
              
              <div className="assigned-faculty">
                <h4>Assigned Faculty:</h4>
                {responsibility.assignedFaculty && responsibility.assignedFaculty.length > 0 ? (
                  <ul>
                    {responsibility.assignedFaculty.map(facultyId => (
                      <li key={facultyId}>
                        <span>{getFacultyName(facultyId)}</span>
                        <button 
                          className="unassign-btn"
                          onClick={() => handleRemoveAssignment(responsibility.id, facultyId)}
                        >
                          Unassign
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-assignments">No faculty assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Responsibility Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Responsibility</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={newResponsibility.title} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={newResponsibility.description} 
                  onChange={handleInputChange} 
                  rows="3"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="deadline">Deadline:</label>
                <input 
                  type="date" 
                  id="deadline" 
                  name="deadline" 
                  value={newResponsibility.deadline} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select 
                  id="priority" 
                  name="priority" 
                  value={newResponsibility.priority} 
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button className="submit-btn" onClick={handleAddResponsibility}>Add Responsibility</button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Responsibility Modal */}
      {isAssignModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Assign Responsibility to Faculty</h2>
              <button className="close-btn" onClick={() => setIsAssignModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="responsibilityId">Select Responsibility:</label>
                <select 
                  id="responsibilityId" 
                  name="responsibilityId" 
                  value={responsibilityAssignment.responsibilityId} 
                  onChange={handleAssignmentChange} 
                  required
                >
                  <option value="">-- Select a Responsibility --</option>
                  {responsibilities.map(responsibility => (
                    <option key={responsibility.id} value={responsibility.id}>{responsibility.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="facultyId">Select Faculty Member:</label>
                <select 
                  id="facultyId" 
                  name="facultyId" 
                  value={responsibilityAssignment.facultyId} 
                  onChange={handleAssignmentChange} 
                  required
                >
                  <option value="">-- Select a Faculty Member --</option>
                  {faculty.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAssignModalOpen(false)}>Cancel</button>
              <button className="submit-btn" onClick={handleAssignResponsibility}>Assign Responsibility</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsibilityManagement;
