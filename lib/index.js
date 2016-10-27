'use strict';

require('app-module-path').addPath(__dirname);
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var config = require('config');

var app = module.exports = express();
var hbs = exphbs.create({
  extname: '.hbs'
});

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || config.http);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/vehicles', require('routes/vehicles'));

app.use(require('./middleware/404.js'));

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});