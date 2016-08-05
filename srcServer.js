var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var webpack = require('webpack');
var config = require('../webpack.config');
var mongoose = require('mongoose');

var api = require('./api');

const PORT = 3000;
const app = express();
const compiler = webpack(config);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jokevote', (err) => {
  console.log(err || 'Mongoose connected!');
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(PORT, err => {
  console.log(err || `server started port ${PORT}`);
});
