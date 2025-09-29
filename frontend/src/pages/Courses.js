import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - This will be replaced with API calls
  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        title: "Artificial Intelligence & Machine Learning",
        description: "Comprehensive course covering AI fundamentals, machine learning algorithms, and real-world applications. Build intelligent systems from scratch.",
        duration: "12 weeks",
        level: "Intermediate",
        category: "ai-ml",
        price: "$299",
        rating: 4.9,
        students: 2500,
        instructor: "Dr. Sarah Chen",
        image: "🤖",
        features: ["Hands-on Projects", "Mentor Support", "Career Guidance", "Certificate"]
      },
      {
        id: 2,
        title: "Generative AI",
        description: "Master the art of creating content with AI. Learn about GANs, VAEs, and modern generative models for images, text, and music.",
        duration: "8 weeks",
        level: "Advanced",
        category: "gen-ai",
        price: "$249",
        rating: 4.8,
        students: 1800,
        instructor: "Mike Rodriguez",
        image: "🎨",
        features: ["Real-world Projects", "Industry Tools", "Portfolio Building", "Certificate"]
      },
      {
        id: 3,
        title: "Large Language Models",
        description: "Deep dive into transformer architectures, attention mechanisms, and building applications with state-of-the-art language models.",
        duration: "10 weeks",
        level: "Advanced",
        category: "llm",
        price: "$279",
        rating: 4.9,
        students: 2200,
        instructor: "Dr. Emily Watson",
        image: "📚",
        features: ["Transformer Architecture", "Fine-tuning", "Deployment", "Certificate"]
      },
      {
        id: 4,
        title: "Fundamentals of Deep Learning",
        description: "Build strong foundations in neural networks, backpropagation, and deep learning architectures. Perfect for beginners in AI.",
        duration: "10 weeks",
        level: "Beginner",
        category: "deep-learning",
        price: "$229",
        rating: 4.7,
        students: 3000,
        instructor: "Prof. Alex Kumar",
        image: "🧠",
        features: ["Python & TensorFlow", "Neural Networks", "CNN & RNN", "Certificate"]
      },
      {
        id: 5,
        title: "Natural Language Processing",
        description: "Learn to process and analyze human language data. Covering sentiment analysis, text classification, and language generation.",
        duration: "9 weeks",
        level: "Intermediate",
        category: "nlp",
        price: "$259",
        rating: 4.8,
        students: 1900,
        instructor: "Dr. Priya Patel",
        image: "💬",
        features: ["Text Processing", "Sentiment Analysis", "Chatbots", "Certificate"]
      },
      {
        id: 6,
        title: "Computer Vision Fundamentals",
        description: "Explore image processing, object detection, and neural networks for visual data analysis and interpretation.",
        duration: "11 weeks",
        level: "Intermediate",
        category: "computer-vision",
        price: "$269",
        rating: 4.7,
        students: 1600,
        instructor: "David Kim",
        image: "👁️",
        features: ["Image Processing", "Object Detection", "OpenCV", "Certificate"]
      }
    ];

    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
  }, []);

  // Filter courses based on category and search term
  useEffect(() => {
    let filtered = courses;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, searchTerm, courses]);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'ai-ml', name: 'AI & ML' },
    { id: 'gen-ai', name: 'Generative AI' },
    { id: 'llm', name: 'LLMs' },
    { id: 'deep-learning', name: 'Deep Learning' },
    { id: 'nlp', name: 'NLP' },
    { id: 'computer-vision', name: 'Computer Vision' }
  ];

  return (
    <div className="courses-page">
      <div className="container">
        {/* Header Section */}
        <div className="courses-header">
          <h1>Explore Our Courses</h1>
          <p>Master cutting-edge technologies with industry-expert instructors and hands-on projects</p>
        </div>

        {/* Search and Filter Section */}
        <div className="courses-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <div className="course-icon">{course.image}</div>
                <div className="course-level">{course.level}</div>
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>
                <p className="course-description">{course.description}</p>

                <div className="course-instructor">
                  <span className="instructor-label">Instructor:</span>
                  <span className="instructor-name">{course.instructor}</span>
                </div>

                <div className="course-stats">
                  <div className="stat">
                    <span className="stat-icon">⭐</span>
                    <span>{course.rating}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="course-features">
                  {course.features.map((feature, index) => (
                    <span key={index} className="feature-tag">✓ {feature}</span>
                  ))}
                </div>

                <div className="course-footer">
                  <div className="course-price">
                    <span className="price">{course.price}</span>
                  </div>
                  <button className="btn btn-primary">Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <div className="no-results">
            <h3>No courses found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;