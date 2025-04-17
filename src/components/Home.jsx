// src/components/landing/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="landing-hero">
          <div className="hero-content">
            <h1>Faculty Management Portal</h1>
            <p className="hero-subtitle">
              Streamline faculty responsibilities, roles, and administrative tasks
            </p>
            <div className="cta-buttons">
              <Link to="/login" className="cta-button primary">Log In</Link>
              <Link to="/signup" className="cta-button secondary">Create Account</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">
              <svg width="100%" height="100%" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="400" fill="#f0f4f8" />
                <circle cx="250" cy="180" r="70" fill="#d1e3fa" />
                <rect x="180" y="260" width="140" height="20" rx="5" fill="#b1cdee" />
                <rect x="210" y="290" width="80" height="20" rx="5" fill="#b1cdee" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>Simplify Department Management</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#3f51b5" strokeWidth="1.5" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Faculty Directory</h3>
            <p>Access comprehensive profiles of all faculty members, including their expertise, contact information, and current responsibilities.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#3f51b5" strokeWidth="1.5" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3>Role Assignment</h3>
            <p>Easily assign and track administrative roles, ensuring fair distribution of responsibilities across the department.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#3f51b5" strokeWidth="1.5" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3>Task Management</h3>
            <p>Create, assign, and monitor responsibilities with deadlines and priority levels to keep everything on track.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="#3f51b5" strokeWidth="1.5" fill="none">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
            </div>
            <h3>Analytics Dashboard</h3>
            <p>Get insights into workload distribution, task completion rates, and department performance at a glance.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up with your institutional email to get started with the faculty management system.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Set Up Profiles</h3>
            <p>Add faculty profiles with relevant information, expertise, and availability.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Define Roles</h3>
            <p>Create and customize roles based on your department's specific needs.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Assign Responsibilities</h3>
            <p>Distribute tasks and responsibilities fairly among faculty members.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Departments Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <div className="quote">"This portal has revolutionized how we manage faculty responsibilities. Everything is now transparent and well-organized."</div>
            <div className="author">
              <div className="author-name">Dr. Rebecca Chen</div>
              <div className="author-title">Department Chair, Computer Science</div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote">"The role assignment feature has made it so much easier to ensure equitable workload distribution across our large department."</div>
            <div className="author">
              <div className="author-name">Prof. James Wilson</div>
              <div className="author-title">Associate Dean, Engineering</div>
            </div>
          </div>
        </div>
      </section>

      <section className="get-started">
        <div className="get-started-content">
          <h2>Ready to Streamline Your Department Management?</h2>
          <p>Join hundreds of departments already using our platform to simplify faculty administration.</p>
          <div className="cta-buttons centered">
            <Link to="/signup" className="cta-button primary">Get Started</Link>
            <Link to="/login" className="cta-button outline">Log In</Link>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">Faculty Management Portal</div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#guide">User Guide</a></li>
                <li><a href="#api">API Documentation</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Faculty Management Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;