const Sequelize = require('sequelize');
const dotenv = require('dotenv');

const env = dotenv.config();

var sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool: {
        max: parseInt(process.env.MAX_CONNECTIONS),
        min: parseInt(process.env.MIN_CONNECTIONS),
        idle: parseInt(process.env.IDLE_TIME)
    }
});

exports.sequelize = sequelize;