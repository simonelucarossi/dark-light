var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', './templates');

app.get('/', function (req, res) {
  res.render('index', { title: 'Home' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});