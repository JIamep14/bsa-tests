var Backbone = require('backbone');
var _ = require('underscore');


module.exports.Book = Backbone.Model.extend({
    urlRoot: 'api/book',
    defaults: {
        id: '',
        title: '',
        author: '',
        genre: '',
        year: '',
        user: {
            id: '',
            firstname: '',
            lastname: '',
            email: ''
        }
    },
    validate: function (attrs, options) {
        var errors = {};
        if (!attrs.title || !attrs.title.match(/^[a-zA-Z\s0-9]+$/) || attrs.title.length < 3) {
            errors.title = 'Title params: Min 3 characters, only letters, required';
        }

        if (!attrs.author || !attrs.author.match(/^[a-zA-Z\s]+$/) || attrs.author.length < 3) {
            errors.author = 'Author params: Min 3 characters, only letters, required';
        }

        if (!attrs.genre || !attrs.genre.match(/^[a-zA-Z\s]+$/) || attrs.genre.length < 3) {
            errors.genre = 'Genre params: Min 3 characters, only letters, required';
        }
        
        if (!attrs.year || attrs.year < 1 || !attrs.year.match(/^[0-9]+$/)) {
            errors.year = 'Year params: Only numeral, positive';
        }


        if (!_.isEmpty(errors)) {
            return errors;
        }
    }
});

module.exports.BookCollection = Backbone.Collection.extend({
    model: Book,
    url: 'api/book'
});

module.exports.bookAPI = {
    getBookEntities: function () {

        var books = new BookCollection();
        books.fetch().then(null, function () {
            alert('I can not fetch data =(');
        });
        return books;
    },
    getBookEntity: function (bookId) {
        var book = new Book({id: bookId});
        var defer = $.Deferred();
        book.fetch({
            success: function (data) {
                defer.resolve(data);
            },
            error: function (data) {
                defer.resolve(undefined);
            }
        });
        return defer.promise();
    }
};


