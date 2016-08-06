var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var api = require('./api');

var PORT = 3000;
var app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jokevote', (err) => {
  console.log(err || 'Mongoose connected!');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/build')));

app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(PORT, err => {
  console.log(err || `server started port ${PORT}`);
});
