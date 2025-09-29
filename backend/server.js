import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Simple CORS for development
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Mock data
const mockCourses = [
  {
    id: 1,
    title: "Artificial Intelligence & Machine Learning",
    description: "Comprehensive course covering AI fundamentals, machine learning algorithms, and real-world applications.",
    duration: "12 weeks",
    level: "Intermediate",
    category: "ai-ml",
    price: 299,
    rating: 4.9,
    students: 2500,
    instructor: "Dr. Sarah Chen",
    image: "🤖",
    features: ["Hands-on Projects", "Mentor Support", "Career Guidance", "Certificate"]
  },
  {
    id: 2,
    title: "Generative AI",
    description: "Master the art of creating content with AI. Learn about GANs, VAEs, and modern generative models.",
    duration: "8 weeks",
    level: "Advanced",
    category: "gen-ai",
    price: 249,
    rating: 4.8,
    students: 1800,
    instructor: "Mike Rodriguez",
    image: "🎨",
    features: ["Real-world Projects", "Industry Tools", "Portfolio Building", "Certificate"]
  },
  {
    id: 3,
    title: "Large Language Models",
    description: "Deep dive into transformer architectures and building applications with state-of-the-art language models.",
    duration: "10 weeks",
    level: "Advanced",
    category: "llm",
    price: 279,
    rating: 4.9,
    students: 2200,
    instructor: "Dr. Emily Watson",
    image: "📚",
    features: ["Transformer Architecture", "Fine-tuning", "Deployment", "Certificate"]
  }
];

const mockReviews = [
  {
    id: 1,
    userName: "Sarah Johnson",
    courseId: 1,
    courseName: "AI & Machine Learning",
    rating: 5,
    comment: "This course transformed my career! The instructors are amazing.",
    avatar: "👩‍💼",
    date: "2 weeks ago"
  },
  {
    id: 2,
    userName: "Mike Chen",
    courseId: 2,
    courseName: "Generative AI",
    rating: 5,
    comment: "The Gen AI course exceeded my expectations.",
    avatar: "👨‍💻",
    date: "1 month ago"
  }
];

// ===== ROUTES =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'EDU-ARENA Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Courses routes
app.get('/api/courses', (req, res) => {
  console.log('📚 Fetching all courses');
  res.json({
    success: true,
    data: mockCourses,
    count: mockCourses.length
  });
});

app.get('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = mockCourses.find(c => c.id === courseId);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }
  
  res.json({
    success: true,
    data: course
  });
});

// Reviews routes
app.get('/api/reviews', (req, res) => {
  console.log('⭐ Fetching all reviews');
  res.json({
    success: true,
    data: mockReviews,
    count: mockReviews.length
  });
});

app.post('/api/reviews', (req, res) => {
  const { userName, courseId, courseName, rating, comment } = req.body;
  
  const newReview = {
    id: mockReviews.length + 1,
    userName,
    courseId,
    courseName,
    rating,
    comment,
    avatar: "👤",
    date: "Just now"
  };
  
  mockReviews.push(newReview);
  
  res.status(201).json({
    success: true,
    data: newReview,
    message: 'Review added successfully'
  });
});

// Users routes
app.post('/api/users/signup', (req, res) => {
  const { fullName, email, password } = req.body;
  
  console.log('👤 User signup:', email);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: 1,
      fullName,
      email,
      token: 'mock-jwt-token'
    }
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('🔐 User login:', email);
  
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      id: 1,
      fullName: 'John Doe',
      email,
      token: 'mock-jwt-token'
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🎯 EDU-ARENA Backend API',
    version: '1.0.0',
    endpoints: {
      courses: '/api/courses',
      users: '/api/users',
      reviews: '/api/reviews',
      health: '/api/health'
    }
  });
});

// Handle Chrome DevTools route
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(200).json({});
});

// 404 handler
app.use('*', (req, res) => {
  if (req.path.includes('.well-known')) {
    return res.status(200).json({});
  }
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Route ${req.originalUrl} does not exist`
  });
});

// Function to start server on available port
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log('\n🎉 EDU-ARENA Backend Server Started!');
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📚 API: http://localhost:${port}/api`);
    console.log(`❤️ Health: http://localhost:${port}/api/health`);
    console.log('\n📋 Available Endpoints:');
    console.log(`   GET  /api/health`);
    console.log(`   GET  /api/courses`);
    console.log(`   GET  /api/courses/:id`);
    console.log(`   GET  /api/reviews`);
    console.log(`   POST /api/reviews`);
    console.log(`   POST /api/users/signup`);
    console.log(`   POST /api/users/login`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`\n🔄 Port ${port} is busy, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('🚨 Server error:', error);
    }
  });
};

// Start with port from .env or default to 5001
const startPort = parseInt(process.env.PORT) || 5001;
console.log(`🔧 Attempting to start server on port ${startPort}...`);
startServer(startPort);

export default app;