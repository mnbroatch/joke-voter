var Router = require('express').Router;
let router = Router();

var jokes = require('./jokes');

router.use('/jokes', jokes);
router.use('/users', users);

