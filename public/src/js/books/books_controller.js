app.module("BooksApp", function (BooksApp, app, Backbone, Marionette, $, _) {

    BooksApp.Controller = {
        listBooks: function () {
            var books = app.request('books:entities');
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
        }
    }
});