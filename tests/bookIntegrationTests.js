var should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book CRUD Test', function() {
    it('Should allow a book to be posted and return a read and _id', function(done) {
        var bookPost = {
            title: 'The River Between',
            author: 'Some Guy',
            genre: 'African'
        };
        agent.post('api/v0.1/books')
             .send(bookPost)
             .expect(200)
             .end(function(err, results) {
                 results.body.read.should.equal(false);
                 results.body.should.have.property('_id');
                 done();
             });
    });

    afterEach(function() {
        Book.remove().exec();
        done();
    });
});
