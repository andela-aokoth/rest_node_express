var bookController = function(Book) {
    var post = function(req, res) {
        var book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    var get = function(req, res) {
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, function(err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                var returnBooks = [];
                books.forEach(function(element, index, array) {
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/v0.1/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    };

    var getBookById = function(req, res) {
        var returnBook = req.book.toJSON();
        returnBook.links = {};
        var filterLink = 'http://' + req.headers.host + '/api/v0.1/books?genre=' + returnBook.genre;
        returnBook.links.filterByThisGenre = filterLink.replace(' ', '%20');
        res.json(returnBook);
    };

    var put = function(req, res) {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
        res.json(req.book);
    };

    var patch = function(req, res) {
        if (req.body._id) { delete req.body._id; }
        for (var p in req.body) {
            req.book[p] = req.body[p];
        }

        req.book.save(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    };

    var remove = function(req, res) {
        req.book.remove(function(err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('removed');
            }
        });
    };

    return {
        post: post,
        get: get,
        getBookById: getBookById,
        put: put,
        patch: patch,
        delete: remove
    };
};

module.exports = bookController;
