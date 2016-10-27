require('app-module-path').addPath(__dirname);
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('config');

const app = module.exports = express();
const hbs = exphbs.create({
  extname: '.hbs',
});

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', (process.env.PORT || config.http));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/vehicles', require('routes/vehicles'));

app.use(require('./middleware/404.js'));

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});

