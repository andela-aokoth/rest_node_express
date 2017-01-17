var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db;

if (process.env.ENV == 'Test') {
    db  = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db  = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')();
var authorRouter = require('./routes/authorRoutes')();
app.use('/api/v0.1/books', bookRouter);
app.use('/api/v0.1/authors', authorRouter);


app.get('/', function(req, res) {
    res.send({message: 'Welcome to the API'});
});

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});

module.exports = app;
