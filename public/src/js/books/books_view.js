app.module("BooksApp", function (BooksApp, app, Backbone, Marionette, $, _) {

    BooksApp.Book = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#book-tr',

        ui: {
            show: '.js-show',
            edit: '.js-edit',
            delete: '.js-delete',
            show_user: '.js-show-user',
            return: '.js-return-book'
        },

        events: {
            'click @ui.show': 'showClicked',
            'click @ui.edit': 'editClicked',
            'click @ui.delete': "deleteClicked",
            'click @ui.show_user': 'showUser',
            'click @ui.return': function () {
                app.trigger('show:book', this.model.get('id'));
            }
        },

        showClicked: function (e) {
            app.trigger('show:book', this.model.get('id'));
        },
        editClicked: function (e) {
            app.trigger('edit:book', this.model.get('id'));
        },
        deleteClicked: function (e) {
            this.model.destroy();
        },

        showUser: function () {
            app.trigger('show:user', this.model.get('user_id'));
        },

        remove: function () {
            this.$el.fadeOut();
        }

    });

    BooksApp.ShowBook = Marionette.ItemView.extend({
        template: '#book-view',
        ui: {
            edit: '.js-edit',
            return: '.js-return'
        },
        events: {
            'click @ui.edit': function () {
                app.trigger('edit:book', this.model.get('id'));
            },
            'click @ui.return': function (e) {
                var self = this;
                this.model.save({ user_id: 0}, {validate: false}, {
                    success: function () {
                        app.trigger('show:book', self.model.get('id'));
                    },
                    error: function () {
                        alert('Some server error. Try later.');
                    }
                });
            }
        },
        modelEvents: {
            'change': 'render'
        }
    });

    BooksApp.NotExists = Marionette.ItemView.extend({
        template: '#book-not-exist'
    });

    BooksApp.Books = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-striped table-hover table-bordered",
        template: "#books-table-template",
        childView: BooksApp.Book,
        itemViewContainer: "tbody"
    });

    BooksApp.EditBook = Marionette.ItemView.extend({
        template: '#edit-book-template',
        ui: {
           save: '.js-save',
           messages: '#messages2',
           form: 'form'
        },
        modelEvents: {
           'change': 'render'
        },
        events: {
            'click @ui.save': function (e) {
                var self = this;
                self.ui.messages.empty();
                self.ui.messages.removeClass();
                e.preventDefault();
                var id = this.ui.form.find("input[name='id']").val();
                var title = this.ui.form.find("input[name='title']").val();
                var author = this.ui.form.find("input[name='author']").val();
                var genre = this.ui.form.find("input[name='genre']").val();
                var year = this.ui.form.find("input[name='year']").val();

                if (this.model.save({
                        id: id,
                        title: title,
                        author: author,
                        genre: genre,
                        year: year
                    }, {
                        success: function (model, response, options) {
                            self.ui.messages.addClass('alert alert-dismissible alert-success');
                            self.ui.messages.append('Success');
                            app.trigger('show:book', self.model.get('id'));
                        },
                        error: function () {
                            self.ui.messages.addClass('alert alert-dismissible alert-warning');
                            self.ui.messages.append('Error');
                        }
                    })) {
                } else {
                    self.ui.messages.append('<ul>');
                    $.each(this.model.validationError, function (key, value) {
                        self.ui.messages.find('ul').append('<li>' + value + '</li>');
                    })
                }
            }
        }
    });

    BooksApp.CreateBook = BooksApp.EditBook.extend({
        events: {
            'click @ui.save': function (e) {
                var book = new app.Entities.Book();
                var self = this;
                self.ui.messages.empty();
                self.ui.messages.removeClass();
                e.preventDefault();
                var title = this.ui.form.find("input[name='title']").val();
                var author = this.ui.form.find("input[name='author']").val();
                var genre = this.ui.form.find("input[name='genre']").val();
                var year = this.ui.form.find("input[name='year']").val();
                book.unset('id');
                if (book.save({
                        title: title,
                        author: author,
                        genre: genre,
                        year: year
                    }, {
                        success: function (model, response, options) {
                            self.ui.messages.addClass('alert alert-dismissible alert-success');
                            self.ui.messages.append('Success');
                            app.trigger('show:book', model.get('id'));
                        },
                        error: function () {
                            self.ui.messages.addClass('alert alert-dismissible alert-warning');
                            self.ui.messages.append('Error');
                        }
                    })) {
                } else {
                    self.ui.messages.append('<ul>');
                    $.each(book.validationError, function (key, value) {
                        self.ui.messages.find('ul').append('<li>' + value + '</li>');
                    })
                }
            }
        }
    });
});
