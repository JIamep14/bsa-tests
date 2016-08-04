var BookModel = require('../models/books/BookModel.js');
var BookCollection = require('../models/books/BooksCollection.js');
var BooksView = require('../views/books/BooksView.js');
var BookView = require('../views/books/BookView.js');
var EditBookView = require('../views/books/EditBook.js');
var CreateBookView = require('../views/books/CreateBook.js');


var notExists = require('../views/NotExists.js');

module.exports = {
    listBooks: function () {
        var booksListView;
        var books = this.getBookEntities();
        if (books !== undefined) {
            booksListView = new BooksView({
                collection: books
            });
        } else {
            booksListView = new notExists({model: new Backbone.Model({item: 'Can not fetch data from server'})});
        }
        app.main.show(booksListView);
    },
    showBook: function (id) {
        app.trigger('show:loading');

        var fetchingBook = this.getBookEntity(id);
        $.when(fetchingBook).done(function (book) {
            var bookView;
            if (book !== undefined) {
                bookView = new BookView({
                    model: book
                });
            }
            else {
                bookView = new notExists({model: new Backbone.Model({item: 'This book does not exist.'})});
            }

            app.getRegion('main').show(bookView);
        });
    },

    editBookView: function (id) {
        app.trigger('show:loading');

        var fetchingBook = this.getBookEntity(id);
        $.when(fetchingBook).done(function (book) {
            var bookView;
            if (book !== undefined) {
                bookView = new EditBookView({
                    model: book
                });

            }
            else {
                bookView = new notExists({model: new Backbone.Model({item: 'This book does not exist.'})});
            }

            app.getRegion('main').show(bookView);
        });
    },

    createBook: function () {
        var view = new CreateBookView({model: new BookModel()});
        app.getRegion('main').show(view);
    },
    getBookEntities: function () {

        var books = new BookCollection();
        books.fetch();

        return books;
    },

    getBookEntity: function (bookId) {
        var book = new BookModel({id: bookId});
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