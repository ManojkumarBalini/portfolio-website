import React, { useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import '../../styles/AdvancedPortfolio.css';

const AdvancedPortfolio = () => {
  const { user, logout } = useAuth();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Particle animation for background
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    const numberOfParticles = 100;

    // Measure the window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 50%, 70%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      // Connect particles with lines
      connectParticles();
      requestAnimationFrame(animate);
    }

    // Connect nearby particles with lines
    function connectParticles() {
      const maxDistance = 100;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.strokeStyle = `hsla(${Math.random() * 360}, 50%, 70%, ${1 - distance/maxDistance})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="advanced-portfolio">
      {/* Animated background canvas */}
      <canvas ref={canvasRef} className="particle-background"></canvas>
      
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="animated-title">
              <span className="title-line">Hello, I'm</span>
              <span className="title-name">{user?.username || 'Developer'}</span>
              <span className="title-role">Full Stack Developer</span>
            </h1>
            <p className="hero-description">
              I create elegant, performant digital experiences with modern web technologies. 
              Passionate about clean code and intuitive user interfaces.
            </p>
            <div className="hero-buttons">
              <button className="glow-button primary-btn">View My Work</button>
              <button className="glow-button secondary-btn">Download CV</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">⚡</div>
              <h3>Fast</h3>
              <p>Optimized performance</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🎨</div>
              <h3>Beautiful</h3>
              <p>Modern design</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">💡</div>
              <h3>Innovative</h3>
              <p>Creative solutions</p>
            </div>
            <div className="main-hero-image">
              <div className="image-container">
                <div className="gradient-border">
                  <div className="profile-image"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-header">
          <h2>About Me</h2>
          <div className="header-line"></div>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with 5+ years of experience creating 
              digital solutions for businesses worldwide. My expertise includes React, 
              Node.js, and cloud technologies.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source projects, or hiking in the mountains.
            </p>
            <div className="stats-container">
              <div className="stat">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>30+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="rotating-cube">
              <div className="cube-face front">React</div>
              <div className="cube-face back">Node.js</div>
              <div className="cube-face top">CSS3</div>
              <div className="cube-face bottom">MySQL</div>
              <div className="cube-face left">Python</div>
              <div className="cube-face right">JavaScript</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section">
        <div className="section-header">
          <h2>My Skills</h2>
          <div className="header-line"></div>
        </div>
        <div className="skills-container">
          {[
            { name: 'React', level: 90, color: '#61DAFB' },
            { name: 'Node.js', level: 85, color: '#68A063' },
            { name: 'JavaScript', level: 95, color: '#F7DF1E' },
            { name: 'CSS/SCSS', level: 88, color: '#CC6699' },
            { name: 'Python', level: 75, color: '#3776AB' },
            { name: 'MongoDB', level: 80, color: '#47A248' },
            { name: 'AWS', level: 70, color: '#FF9900' },
            { name: 'UI/UX Design', level: 82, color: '#FF6B6B' }
          ].map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ 
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                    boxShadow: `0 0 15px ${skill.color}`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-header">
          <h2>My Projects</h2>
          <div className="header-line"></div>
        </div>
        <div className="projects-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="project-card">
              <div className="project-image">
                <div className="project-overlay">
                  <button className="project-btn">View Project</button>
                </div>
              </div>
              <div className="project-content">
                <h3>Project Title {item}</h3>
                <p>An amazing project description that showcases my skills and expertise in web development.</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <div className="header-line"></div>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>contact@example.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+1 (234) 567-8901</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>India, In</p>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" className="form-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" className="form-textarea"></textarea>
            </div>
            <button type="submit" className="glow-button primary-btn">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-footer">
        <div className="footer-content">
          <div className="social-links">
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
          <p>© {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedPortfolio;