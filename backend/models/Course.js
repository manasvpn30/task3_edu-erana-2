import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    defaultValue: 0
  },
  students: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: '📚'
  },
  features: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'courses',
  timestamps: true
});