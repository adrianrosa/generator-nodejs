const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const app = express();
const router = require('./routes');
const handlerError = require('./utils/error/handler.error');

// Add morgan logger
app.use(morgan('combined'));

app.use(helmet());

dotenv.config({
    path: process.env.ENVIRONMENT
        ? `./configs/.env.${process.env.ENVIRONMENT}`
        : './configs/.env'
});

// Add cors and configure it
app.use(cors());
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGINS);
    next();
});

// Add body parser
app.use(bodyParser.json());

// Add router
app.use(router);

// Handler error
app.use((err, req, res, next) => {
    handlerError(err, res);
});

module.exports = app;
