var express = require('express');

var routes = function() {
    var authorRouter = express.Router();

    authorRouter.route('/')
        .get(function(req, res) {
            res.json({message: 'GETting Authors'});
        })
        .post(function(req, res) {
            res.json({message: 'POSTing Authors'});
        });

    authorRouter.route('/:authorId')
        .get(function(req, res) {
            res.json({message: 'GETting Author ' + req.params.authorId});
        });

    return authorRouter;
};

module.exports = routes;
