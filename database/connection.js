const Sequelize = require('sequelize');

const DB = process.env.DB_NAME || 'queuing';
const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || 'password';
const HOST = process.env.DB_HOST || 'localhost';
const LOGGING = JSON.parse(process.env.DB_LOGGING) ? 'console.log' : false;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  dialect: 'mysql',
  host: HOST,
  logging: LOGGING,
});

module.exports = sequelize;
