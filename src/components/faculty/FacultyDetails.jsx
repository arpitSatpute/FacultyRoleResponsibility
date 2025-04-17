import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function FacultyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFaculty, setEditedFaculty] = useState(null);
  
  // Available roles and responsibilities that can be assigned
  const availableRoles = [
    'Department Head',
    'Academic Senate',
    'Research Committee',
    'Curriculum Committee',
    'Graduate Advisor',
    'Lab Director',
    'Grants Committee',
    'Faculty Senate',
    'Student Affairs Committee',
    'Outreach Coordinator',
    'Undergraduate Advisor'
  ];
  
  const availableResponsibilities = [
    'Course Development',
    'Student Mentoring',
    'Research Supervision',
    'Department Meetings',
    'Admissions Review',
    'Budget Planning',
    'Annual Reporting',
    'Community Engagement',
    'Program Assessment',
    'Thesis Committee',
    'Conference Organization'
  ];

  // In a real app, this would be an API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Mock data - in real app, this would come from an API
      const mockFaculty = {
        id,
        name: 'Dr. Sarah Johnson',
        email: 'sjohnson@university.edu',
        department: 'Computer Science',
        position: 'Associate Professor',
        joinDate: '2018-09-01',
        roles: ['Department Head', 'Research Committee'],
        responsibilities: ['Course Development', 'Student Mentoring'],
        bio: 'Dr. Johnson specializes in artificial intelligence and machine learning, with over 10 years of experience in academia and industry research.',
        officeHours: 'Monday and Wednesday, 2:00 PM - 4:00 PM',
        officeLocation: 'Science Building, Room 305',
        phone: '(555) 123-4567'
      };
      
      setFaculty(mockFaculty);
      setEditedFaculty(mockFaculty);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFaculty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    setFaculty(editedFaculty);
    setIsEditing(false);
    // In a real app, you would save to an API here
  };
  
  const handleRoleToggle = (role) => {
    setEditedFaculty(prev => {
      const currentRoles = prev.roles || [];
      if (currentRoles.includes(role)) {
        return {
          ...prev,
          roles: currentRoles.filter(r => r !== role)
        };
      } else {
        return {
          ...prev,
          roles: [...currentRoles, role]
        };
      }
    });
  };
  
  const handleResponsibilityToggle = (responsibility) => {
    setEditedFaculty(prev => {
      const currentResponsibilities = prev.responsibilities || [];
      if (currentResponsibilities.includes(responsibility)) {
        return {
          ...prev,
          responsibilities: currentResponsibilities.filter(r => r !== responsibility)
        };
      } else {
        return {
          ...prev,
          responsibilities: [...currentResponsibilities, responsibility]
        };
      }
    });
  };

  if (isLoading) {
    return <div className="loading">Loading faculty details...</div>;
  }

  if (!faculty) {
    return <div className="error">Faculty member not found</div>;
  }

  return (
    <div className="faculty-detail-container">
      <div className="faculty-detail-header">
        <button className="back-btn" onClick={() => navigate('/faculty')}>
          &larr; Back to Faculty List
        </button>
        <h1>{faculty.name}</h1>
        <div className="faculty-actions">
          {isEditing ? (
            <>
              <button className="cancel-edit-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>

      <div className="faculty-detail-content">
        <div className="faculty-profile">
          <h2>Faculty Profile</h2>
          
          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={editedFaculty.name} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={editedFaculty.email} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <input 
                  type="text" 
                  id="department" 
                  name="department" 
                  value={editedFaculty.department} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="position">Position:</label>
                <input 
                  type="text" 
                  id="position" 
                  name="position" 
                  value={editedFaculty.position} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="joinDate">Join Date:</label>
                <input 
                  type="date" 
                  id="joinDate" 
                  name="joinDate" 
                  value={editedFaculty.joinDate} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Biography:</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  value={editedFaculty.bio} 
                  onChange={handleInputChange} 
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="officeHours">Office Hours:</label>
                <input 
                  type="text" 
                  id="officeHours" 
                  name="officeHours" 
                  value={editedFaculty.officeHours} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="officeLocation">Office Location:</label>
                <input 
                  type="text" 
                  id="officeLocation" 
                  name="officeLocation" 
                  value={editedFaculty.officeLocation} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input 
                  type="text" 
                  id="phone" 
                  name="phone" 
                  value={editedFaculty.phone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{faculty.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Department:</span>
                <span className="info-value">{faculty.department}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Position:</span>
                <span className="info-value">{faculty.position}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Join Date:</span>
                <span className="info-value">{new Date(faculty.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Biography:</span>
                <p className="info-value bio">{faculty.bio}</p>
              </div>
              <div className="info-row">
                <span className="info-label">Office Hours:</span>
                <span className="info-value">{faculty.officeHours}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Office Location:</span>
                <span className="info-value">{faculty.officeLocation}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{faculty.phone}</span>
              </div>
            </div>
          )}
        </div>

        <div className="roles-responsibilities">
          <div className="roles-section">
            <h2>Assigned Roles</h2>
            
            {isEditing ? (
              <div className="roles-checkboxes">
                {availableRoles.map(role => (
                  <div key={role} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`role-${role}`}
                      checked={editedFaculty.roles && editedFaculty.roles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                    />
                    <label htmlFor={`role-${role}`}>{role}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="assigned-roles">
                {faculty.roles && faculty.roles.length > 0 ? (
                  <ul className="role-list">
                    {faculty.roles.map((role, index) => (
                      <li key={index} className="role-item">{role}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">No roles assigned yet.</p>
                )}
              </div>
            )}
          </div>
          
          <div className="responsibilities-section">
            <h2>Assigned Responsibilities</h2>
            
            {isEditing ? (
              <div className="responsibilities-checkboxes">
                {availableResponsibilities.map(responsibility => (
                  <div key={responsibility} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`resp-${responsibility}`}
                      checked={editedFaculty.responsibilities && editedFaculty.responsibilities.includes(responsibility)}
                      onChange={() => handleResponsibilityToggle(responsibility)}
                    />
                    <label htmlFor={`resp-${responsibility}`}>{responsibility}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="assigned-responsibilities">
                {faculty.responsibilities && faculty.responsibilities.length > 0 ? (
                  <ul className="responsibility-list">
                    {faculty.responsibilities.map((responsibility, index) => (
                      <li key={index} className="responsibility-item">{responsibility}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-items">No responsibilities assigned yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDetail;