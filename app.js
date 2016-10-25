const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const scApi = require('./utils/SmartCarApi');

const app = module.exports = express();
const hbs = exphbs.create({
  extname: '.hbs',
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/vehicles/:id', (req, res) => {
  scApi.vehicleInfo(req.params.id, (error, response) => {
    if (error) {
      res.status(error.status).json(error);
    }

    const { status, data } = response;
    res.status(status).json(data);
  });
});

app.get('/vehicles/:id/doors', (req, res) => {
  scApi.security(req.params.id, (error, response) => {
    if (error) {
      res.status(error.status).json(error);
    }

    const { status, data } = response;
    res.status(status).json(data);
  });
});

app.use(require('./middleware/404.js'));

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
