const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const scApi = require('./utils/SmartCarApi');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/vehicles/:id', function (req, res) {
  scApi.vehicleInfo(req.params.id, function(error, response) {
    if (error) {

    }
    
    const { status, data } = response;
    res.status(status).json(data);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

