import express from 'express';

const router = express.Router();

// Mock reviews data (replace with database later)
let reviews = [
  {
    id: 1,
    userId: 1,
    userName: 'Sarah Johnson',
    courseId: 1,
    courseName: 'AI & Machine Learning',
    rating: 5,
    comment: 'This course transformed my career! The instructors are amazing and the projects are industry-relevant.',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    userId: 2,
    userName: 'Mike Chen',
    courseId: 2,
    courseName: 'Generative AI',
    rating: 5,
    comment: 'The Gen AI course exceeded my expectations. Hands-on projects helped me build a strong portfolio.',
    createdAt: new Date('2024-01-20').toISOString()
  }
];

// GET /api/reviews - Get all reviews
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      data: reviews,
      count: reviews.length
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews'
    });
  }
});

// POST /api/reviews - Create new review
router.post('/', async (req, res) => {
  try {
    const { userName, courseId, courseName, rating, comment } = req.body;
    
    const newReview = {
      id: reviews.length + 1,
      userId: reviews.length + 1, // Mock user ID
      userName,
      courseId,
      courseName,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    
    reviews.push(newReview);
    
    res.status(201).json({
      success: true,
      data: newReview,
      message: 'Review added successfully'
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create review'
    });
  }
});

// GET /api/reviews/course/:courseId - Get reviews by course
router.get('/course/:courseId', async (req, res) => {
  try {
    const courseReviews = reviews.filter(review => review.courseId == req.params.courseId);
    
    res.json({
      success: true,
      data: courseReviews,
      count: courseReviews.length
    });
  } catch (error) {
    console.error('Error fetching course reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course reviews'
    });
  }
});

export default router;