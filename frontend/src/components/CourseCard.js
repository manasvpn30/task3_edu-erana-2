import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#6C757D';
    }
  };

  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.image_url} alt={course.title} />
        <div 
          className="course-badge"
          style={{ backgroundColor: getLevelColor(course.level) }}
        >
          {course.level}
        </div>
      </div>

      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">By {course.instructor}</p>
        <p className="course-description">
          {course.description.length > 120 
            ? `${course.description.substring(0, 120)}...` 
            : course.description
          }
        </p>

        <div className="course-meta">
          <div className="course-stats">
            <span className="course-rating">
              ⭐ {course.rating || 'New'}
            </span>
            <span>👥 {course.students_enrolled}</span>
            <span>🕒 {course.duration}h</span>
          </div>
        </div>

        <div className="course-footer">
          <div className="course-price">${course.price}</div>
          <Link to={`/courses/${course.id}`} className="btn btn-primary">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;