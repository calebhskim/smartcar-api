const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 3000));
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(bodyParser.json());

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

