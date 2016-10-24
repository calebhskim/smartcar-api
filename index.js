const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const scApi = require('./utils/SmartCarApi');

var app = express();
var hbs = exphbs.create({
  extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/vehicles/:id', function (req, res) {
  scApi.vehicleInfo(req.params.id, function(error, response) {
    if (error) {

    }
    
    const { status, data } = response;
    res.status(status).json(data);
  });
});

app.use(require('./middleware/404.js'));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

