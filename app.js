// boilerplate code
var express = require('express'),
  app = express(),
  bodyParser = require("body-parser");
  methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));

var books = [
  {
    id:0,
    title:'Foundation',
    author: 'Isaac Asimov',
    year: 1951,
    img: 'https://upload.wikimedia.org/wikipedia/en/2/25/Foundation_gnome.jpg'
  }
];

// 'GET' for '/'
app.get('/', function(req, res) {
  res.redirect('/books');
});

// 'GET' for '/books'
app.get('/books', function(req, res) {
  res.render('books/index', {books:books});
});

// 'GET' for '/books/new' new book form
app.get('/books/new', function(req, res) {
  res.render('books/new');
});

// 'GET' for '/books/search' search by title
app.get('/books/search', function(req, res) {
  var id = searchByTitle(req.query.title);
  res.redirect(id === -1 ? '/404' : '/books/'+id);
});

// 'GET' for '/books/:id' look up book
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  var book = books[id];
  if (book) {
    res.render('books/book', book);
  }
  else {
    res.redirect('/404');
  }
});

// 'POST' for '/books' save book from /books/new
app.post('/books/', function(req, res) {
  var book = req.body,
      id = getAvailableID();
  book.id = id;
  books[id] = book;
  res.redirect('/books/' + id);
});

// 'GET' for '/books/:id/edit' edit book form
app.get('/books/:id/edit', function(req, res) {
  res.render('books/edit', books[req.params.id]);
});

// 'PUT' for '/books' edit book from /books/:id/edit
app.put('/books/:id', function(req, res) {
  var id = req.params.id;
  var book = req.body;
  book.id = id;
  books[id] = book;
  res.redirect('/books/' + id);
});

// 'DELETE' for '/books' edit book from /books/:id/edit
app.delete('/books/:id', function(req, res) {
  var id = req.params.id;
  books[id] = undefined;
  res.redirect('/books');
});

// 'GET' for '/404'
app.get('*', function (req, res) {
  res.render('site/404');
});

// start server
app.listen(3000, function() {
  console.log('Server running on port:3000');
});

function getAvailableID() {
  var id = books.indexOf(undefined);
  return id === -1 ? books.length : id;
}

function searchByTitle(title) {
  var foundID = -1;
  books.forEach(function(book) {
    if (book.title === title) foundID = book.id;
  });
  return foundID;
}