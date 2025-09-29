import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Artificial Intelligence & Machine Learning",
      description: "Master the fundamentals of AI and ML with hands-on projects",
      duration: "12 weeks",
      level: "Intermediate",
      icon: "🤖"
    },
    {
      id: 2,
      title: "Generative AI",
      description: "Create amazing content with cutting-edge generative models",
      duration: "8 weeks",
      level: "Advanced",
      icon: "🎨"
    },
    {
      id: 3,
      title: "Large Language Models",
      description: "Deep dive into transformers and modern NLP architectures",
      duration: "10 weeks",
      level: "Advanced",
      icon: "📚"
    }
  ];

  const stats = [
    { number: "10K+", label: "Students Enrolled" },
    { number: "50+", label: "Expert Instructors" },
    { number: "100+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Welcome to <span className="highlight">EDU-ARENA</span></h1>
              <h2>Where Learning Meets Innovation</h2>
              <p>
                Master cutting-edge technologies with industry experts. 
                Join thousands of learners transforming their careers in AI, 
                Machine Learning, and advanced computing.
              </p>
              <div className="hero-buttons">
                <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
                <Link to="/signup" className="btn btn-secondary">Start Learning</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-cards">
                <div className="floating-card card-1">🤖 AI</div>
                <div className="floating-card card-2">🧠 ML</div>
                <div className="floating-card card-3">🎨 GenAI</div>
                <div className="floating-card card-4">📚 LLM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <div className="container">
          <div className="section-title">
            <h2>Featured Courses</h2>
            <p>Hand-picked advanced courses to boost your career</p>
          </div>
          <div className="courses-grid">
            {featuredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-icon">{course.icon}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-meta">
                  <span className="duration">⏱️ {course.duration}</span>
                  <span className="level">📊 {course.level}</span>
                </div>
                <Link to="/courses" className="btn btn-primary">Learn More</Link>
              </div>
            ))}
          </div>
          <div className="view-all-courses">
            <Link to="/courses" className="btn btn-secondary">View All Courses</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Career?</h2>
            <p>Join EDU-ARENA today and start your journey towards mastering cutting-edge technologies</p>
            <Link to="/signup" className="btn btn-primary">Get Started Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;