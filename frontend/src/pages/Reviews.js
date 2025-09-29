import React, { useState } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      course: "AI & Machine Learning",
      rating: 5,
      comment: "This course transformed my career! The instructors are amazing and the projects are industry-relevant.",
      avatar: "👩‍💼",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      course: "Generative AI",
      rating: 5,
      comment: "The Gen AI course exceeded my expectations. Hands-on projects helped me build a strong portfolio.",
      avatar: "👨‍💻",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Davis",
      course: "Large Language Models",
      rating: 4,
      comment: "Comprehensive coverage of LLMs. The community support and mentor guidance were invaluable.",
      avatar: "👩‍🎓",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      course: "Deep Learning Fundamentals",
      rating: 5,
      comment: "Perfect balance of theory and practice. I landed a job as a DL engineer after completing this course!",
      avatar: "👨‍🔬",
      date: "2 months ago"
    },
    {
      id: 5,
      name: "Priya Patel",
      course: "Natural Language Processing",
      rating: 4,
      comment: "Excellent course structure. The real-world case studies made complex concepts easy to understand.",
      avatar: "👩‍🏫",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "David Kim",
      course: "AI & Machine Learning",
      rating: 5,
      comment: "From beginner to job-ready in 12 weeks. The career support team helped me negotiate a great offer!",
      avatar: "👨‍💼",
      date: "3 days ago"
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    course: '',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log('New review:', newReview);
    setNewReview({ name: '', course: '', rating: 5, comment: '' });
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="reviews-page">
      <div className="container">
        {/* Header Section */}
        <div className="reviews-header">
          <h1>Student Reviews</h1>
          <p>See what our students have to say about their learning experience at EDU-ARENA</p>
        </div>

        {/* Stats Section */}
        <div className="reviews-stats">
          <div className="stat-card">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2,500+</div>
            <div className="stat-label">Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Would Recommend</div>
          </div>
        </div>

        {/* Add Review Form */}
        <div className="add-review-section">
          <h2>Share Your Experience</h2>
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Course Taken</label>
                <select
                  value={newReview.course}
                  onChange={(e) => setNewReview({...newReview, course: e.target.value})}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Generative AI">Generative AI</option>
                  <option value="Large Language Models">Large Language Models</option>
                  <option value="Deep Learning Fundamentals">Deep Learning Fundamentals</option>
                  <option value="Natural Language Processing">Natural Language Processing</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                    onClick={() => setNewReview({...newReview, rating: star})}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Share your learning experience..."
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="avatar">{review.avatar}</div>
                  <div>
                    <h4>{review.name}</h4>
                    <p className="course-name">{review.course}</p>
                  </div>
                </div>
                <div className="review-meta">
                  <div className="rating">{renderStars(review.rating)}</div>
                  <span className="date">{review.date}</span>
                </div>
              </div>
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;