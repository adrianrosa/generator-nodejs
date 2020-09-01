const express = require('express');
const router = express.Router();

const { validation } = require('./middlewares/middleware');
const controller = require('./controllers/controller.js');

router.get('/', [validation], controller.index);

module.exports = router;
