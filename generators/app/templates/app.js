const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimiter = require('express-rate-limit');
const app = express();
const router = require('./routes');
const winston = require('./utils/log');
const handlerError = require('./utils/error/handler.error');

// Add morgan logger (with winston)
app.use(morgan('combined', { stream: winston.stream }));
global.logger = winston;

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

// Add rate limiter
app.use(rateLimiter({
    windowMs: process.env.WINDOWS_REQS || 60000,
    max: process.env.MAX_COUNT_REQS || 100,
    headers: false
}));

// Add body parser
app.use(express.json());

// Add router
app.use(router);

// Handler error
app.use((err, req, res, next) => {
    handlerError(err, res);
});

module.exports = app;
