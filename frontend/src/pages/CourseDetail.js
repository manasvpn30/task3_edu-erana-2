import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const data = await apiService.getCourse(id);
      setCourse(data);
    } catch (error) {
      console.error('Error loading course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    setSubmitting(true);
    try {
      await apiService.addReview(id, {
        ...review,
        user_id: user.id
      });
      setReview({ rating: 5, comment: '' });
      loadCourse(); // Reload course to show new review
      alert('Review submitted successfully!');
    } catch (error) {
      alert('Error submitting review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container">
        <div className="error">
          <h2>Course not found</h2>
          <p>The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail">
      {/* Course Hero */}
      <div className="course-hero" style={{ 
        background: `linear-gradient(135deg, var(--accent-blue) 0%, var(--dark-black) 100%)`,
        color: 'var(--white)',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{course.title}</h1>
              <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
                {course.description}
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <strong>Instructor:</strong> {course.instructor}
                </div>
                <div>
                  <strong>Level:</strong> {course.level}
                </div>
                <div>
                  <strong>Duration:</strong> {course.duration} hours
                </div>
                <div>
                  <strong>Rating:</strong> ⭐ {course.rating || 'No ratings yet'}
                </div>
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '2rem', 
              borderRadius: '15px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary-yellow)', marginBottom: '1rem' }}>
                ${course.price}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}>
                Enroll Now
              </button>
              <div style={{ fontSize: '0.9rem', opacity: 0.8, textAlign: 'center' }}>
                {course.students_enrolled} students enrolled
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          {/* Main Content */}
          <div>
            {/* What You'll Learn */}
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--dark-black)' }}>What You'll Learn</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1rem' 
              }}>
                {[
                  'Master fundamental AI concepts and algorithms',
                  'Build real-world machine learning projects',
                  'Understand neural networks and deep learning',
                  'Deploy models to production environments',
                  'Optimize model performance and accuracy',
                  'Stay updated with latest industry trends'
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--primary-orange)' }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section>
              <h2 style={{ marginBottom: '1.5rem', color: 'var(--dark-black)' }}>
                Student Reviews ({course.reviews?.length || 0})
              </h2>

              {/* Add Review Form */}
              {user && (
                <form onSubmit={handleSubmitReview} style={{ 
                  background: 'var(--white)', 
                  padding: '2rem', 
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  marginBottom: '2rem'
                }}>
                  <h3>Add Your Review</h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <label>Rating: </label>
                    <select 
                      value={review.rating} 
                      onChange={(e) => setReview({...review, rating: parseInt(e.target.value)})}
                      style={{ marginLeft: '1rem', padding: '0.5rem' }}
                    >
                      {[5,4,3,2,1].map(num => (
                        <option key={num} value={num}>{num} ⭐</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <textarea
                      value={review.comment}
                      onChange={(e) => setReview({...review, comment: e.target.value})}
                      placeholder="Share your experience with this course..."
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        minHeight: '100px'
                      }}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div>
                {course.reviews && course.reviews.length > 0 ? (
                  course.reviews.map(review => (
                    <div key={review.id} style={{
                      background: 'var(--white)',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{review.User?.avatar || '👤'}</span>
                          <strong>{review.User?.name || 'Anonymous'}</strong>
                        </div>
                        <div style={{ color: 'var(--secondary-yellow)' }}>
                          {'⭐'.repeat(review.rating)}
                        </div>
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-light)' }}>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>
                    No reviews yet. Be the first to review this course!
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{
              background: 'var(--white)',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '2rem'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Course Details</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <strong>Category:</strong> {course.category}
                </div>
                <div>
                  <strong>Lectures:</strong> {course.lectures}
                </div>
                <div>
                  <strong>Duration:</strong> {course.duration} hours
                </div>
                <div>
                  <strong>Level:</strong> {course.level}
                </div>
                <div>
                  <strong>Students:</strong> {course.students_enrolled}
                </div>
                <div>
                  <strong>Last Updated:</strong> {new Date(course.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;