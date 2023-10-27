const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
require('dotenv').config();
const errorHandler = require("./api/error-handler/error-handler");


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Shop API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: `http://${process.env.HOST}:${process.env.PORT}`,
			},
		],
	},
	apis: ["./api/controllers/*.js"],
};

const specs = swaggerJsDoc(options);


const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', require('./api/controllers/product.controller'));

app.use(errorHandler);

module.exports = app;