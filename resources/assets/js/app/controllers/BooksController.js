var BookModel = require('../models/books/BookModel.js');
var BookCollection = require('../models/books/BooksCollection.js');


module.exports = {
    listBooks: function () {
        var books = this.getBookEntities();
        var booksListView = new BooksApp.Books({
            collection: books
        });

        app.main.show(booksListView);
    },
    showBook: function (id) {
        var fetchingBook = app.request('books:entity', id);
        app.tmps.Controller.showLoading();
        $.when(fetchingBook).done(function (book) {
            var bookView;
            if (book !== undefined) {
                bookView = new BooksApp.ShowBook({
                    model: book
                });
            }
            else {
                bookView = new BooksApp.NotExists({});
            }

            app.getRegion('main').show(bookView);
        });
        // getUsers: function () {
        //     app.users = app.request('users:entities');
        // }

    },

    editBookView: function (id) {
        var fetchingBook = app.request('books:entity', id);
        app.tmps.Controller.showLoading();

        $.when(fetchingBook).done(function (book) {
            var bookView;
            if (book !== undefined) {
                bookView = new BooksApp.EditBook({
                    model: book
                });

            }
            else {
                bookView = new BooksApp.NotExists({});
            }

            app.getRegion('main').show(bookView);
        });
    },

    createBook: function () {
        var view = new BooksApp.CreateBook({model: new app.Entities.Book()});
        app.getRegion('main').show(view);
    },
    getBookEntities: function () {

        var books = new Entities.BookCollection();
        books.fetch().then(null, function () {
            console.log('I can not fetch books =(');
        });
        return books;

        // var books = new Entities.BookCollection();
        // books.fetch();
        // return books;
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