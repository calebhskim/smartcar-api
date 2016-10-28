import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import config from  './config';

const app = module.exports = express();
const hbs = exphbs.create({
  extname: '.hbs',
});
const apiLimiter = new rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes,
  delayAfter: 20,
  max: 25,
});

app.set('env', process.env.NODE_ENV || 'development');
app.set('port', (process.env.PORT || config.http));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use('/vehicles/', apiLimiter);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/vehicles', require('./routes/vehicles'));

app.use(require('./middleware/404.js'));

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});

