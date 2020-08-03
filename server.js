var express = require('express');
var app = express();

var db = require('./db');
db.setupDb();

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static('static_files'));

app.get('/', function (req, res) {
  db.getLastStatus(req.ip, function(lastStatus) {
    res.render('index', { title: 'Home', lastStatus: lastStatus });
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});