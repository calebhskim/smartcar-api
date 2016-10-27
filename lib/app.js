'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = module.exports = (0, _express2.default)();
var hbs = _expressHandlebars2.default.create({
  extname: '.hbs'
});

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || _config2.default.http);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.use('/vehicles', require('./routes/vehicles'));

app.use(require('./middleware/404.js'));

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});