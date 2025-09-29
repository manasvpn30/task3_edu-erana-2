import sequelize from '../config/database.js';
import Course from './Course.js';
import User from './User.js';
import Review from './Review.js';

const models = {
  Course,
  User,
  Review
};

// Associations
Course.hasMany(Review, { foreignKey: 'course_id', as: 'reviews' });
Review.belongsTo(Course, { foreignKey: 'course_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Database sync failed:', error);
  }
};

export { sequelize, syncDatabase, Course, User, Review };