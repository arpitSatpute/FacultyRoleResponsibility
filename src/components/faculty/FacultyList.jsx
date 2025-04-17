import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // In a real app, this would come from an API
  useEffect(() => {
    // Mock data
    const mockFaculty = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        email: 'sjohnson@university.edu',
        department: 'Computer Science',
        position: 'Associate Professor',
        joinDate: '2018-09-01',
        roles: ['Department Head', 'Research Committee']
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        email: 'mchen@university.edu',
        department: 'Mathematics',
        position: 'Full Professor',
        joinDate: '2010-01-15',
        roles: ['Academic Senate', 'Curriculum Committee']
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        email: 'erodriguez@university.edu',
        department: 'Engineering',
        position: 'Assistant Professor',
        joinDate: '2020-08-20',
        roles: ['Graduate Advisor']
      },
      {
        id: '4',
        name: 'Prof. James Wilson',
        email: 'jwilson@university.edu',
        department: 'Physics',
        position: 'Associate Professor',
        joinDate: '2015-07-10',
        roles: ['Lab Director', 'Grants Committee']
      }
    ];
    
    setFaculty(mockFaculty);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFaculty = () => {
    const id = Date.now().toString();
    const facultyWithId = {
      ...newFaculty,
      id,
      roles: []
    };
    
    setFaculty(prev => [...prev, facultyWithId]);
    setNewFaculty({
      name: '',
      email: '',
      department: '',
      position: '',
      joinDate: ''
    });
    setIsAddModalOpen(false);
  };

  const handleRemoveFaculty = (id) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      setFaculty(prev => prev.filter(faculty => faculty.id !== id));
    }
  };

  const filteredFaculty = faculty.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faculty-list-container">
      <div className="faculty-header">
        <h1>Faculty Members</h1>
        <div className="faculty-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="add-faculty-btn"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Faculty
          </button>
        </div>
      </div>

      {faculty.length === 0 ? (
        <div className="no-faculty">
          <p>No faculty members found. Add your first faculty member!</p>
        </div>
      ) : (
        <div className="faculty-grid">
          {filteredFaculty.map(member => (
            <div key={member.id} className="faculty-card">
              <div className="faculty-card-header">
                <h3>{member.name}</h3>
                <div className="faculty-card-actions">
                  <Link to={`/faculty/${member.id}`} className="view-link">View</Link>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFaculty(member.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="faculty-info">
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Department:</strong> {member.department}</p>
                <p><strong>Position:</strong> {member.position}</p>
                <p><strong>Join Date:</strong> {new Date(member.joinDate).toLocaleDateString()}</p>
              </div>

              <div className="faculty-roles">
                <h4>Assigned Roles:</h4>
                {member.roles && member.roles.length > 0 ? (
                  <ul>
                    {member.roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-roles">No roles assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Faculty</h2>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={newFaculty.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={newFaculty.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <input 
                  type="text" 
                  id="department" 
                  name="department" 
                  value={newFaculty.department} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position:</label>
                <input 
                  type="text" 
                  id="position" 
                  name="position" 
                  value={newFaculty.position} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="joinDate">Join Date:</label>
                <input 
                  type="date" 
                  id="joinDate" 
                  name="joinDate" 
                  value={newFaculty.joinDate} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
              <button className="submit-btn" onClick={handleAddFaculty}>Add Faculty</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyList;