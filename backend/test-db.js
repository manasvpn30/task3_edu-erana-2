const { Sequelize } = require('sequelize');
require('dotenv').config();

const testConnection = async () => {
  try {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: console.log,
      }
    );

    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // Test basic query
    const [result] = await sequelize.query('SELECT version()');
    console.log('📊 PostgreSQL Version:', result[0].version);
    
    await sequelize.close();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

testConnection();