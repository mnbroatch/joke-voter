var Router = require('express').Router;
const router = Router();

var jokes = require('./jokes');

router.use('/jokes', jokes);
router.use('/users', users);

