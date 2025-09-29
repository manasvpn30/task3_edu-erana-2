import express from 'express';
import { Course } from '../models/Course.js';

const router = express.Router();

// GET /api/courses - Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
});

// GET /api/courses/:id - Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
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
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course'
    });
  }
});

// POST /api/courses - Create new course
router.post('/', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create course'
    });
  }
});

// PUT /api/courses/:id - Update course
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    await course.update(req.body);
    res.json({
      success: true,
      data: course,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update course'
    });
  }
});

// DELETE /api/courses/:id - Delete course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    await course.destroy();
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete course'
    });
  }
});

export default router;