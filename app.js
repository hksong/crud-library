// boilerplate code
var express = require('express'),
  app = express(),
  bodyParser = require("body-parser");
  methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));

// 'GET' for root '/'
app.get('/', function(req, res) {
  res.render('', {});
});

// start server
app.listen(3000, function() {
  console.log('Server running on port:3000');
});