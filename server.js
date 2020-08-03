var express = require('express');
var app = express();

var db = require('./db');
db.setupDb();

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static('static_files'));
app.use(express.json());

app.get('/', function (req, res) {
  db.getLastStatus(req.ip, function(lastStatus) {
    res.render('index', { title: 'Home', lastStatus: lastStatus });
  })
});

app.get('/stats', function(req, res) {
  db.getStats(req.ip, function(rows) { res.json(rows); });
});

app.post('/switches', function(req, res) {
  db.insertSwitch(req.ip, req.body.mode, function() { res.status(201).end(); });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});