import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Hello, I'm {user?.username || 'Developer'}</h1>
          <h2>Full Stack Developer</h2>
          <p>
            I'm a passionate developer with expertise in creating modern web applications 
            using React, Node.js, and various other technologies. I love turning ideas 
            into reality through code.
          </p>
          <div className="hero-actions">
            <a href="/resume.pdf" download className="btn btn-primary">
              Download Resume
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </div>
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>
    </section>
  );
}