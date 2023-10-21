const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require('dotenv').config();

module.exports = db = {};

initialize();

async function initialize() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.password
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE}\`;`);

    const sequelize = new Sequelize(
        process.env.DATABASE,
        process.env.USER,
        process.env.PASSWORD,
        {
            host: process.env.HOST,
            dialect: 'mysql'
        }
    );

    db.Product = require('../models/product.model')(sequelize);

    await sequelize.sync({ alter: true });
}