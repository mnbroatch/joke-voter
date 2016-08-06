var Router = require('express').Router;
var router = Router();

var jokes = require('./jokes');

router.use('/jokes', jokes);

module.exports = router;
