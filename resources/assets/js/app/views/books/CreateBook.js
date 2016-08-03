var EditBookView = require('./EditBook.js');
var BookModel = require('../../models/books/BookModel.js');

module.exports = EditBookView.extend({
    events: {
        'click @ui.save': function (e) {
            var book = new BookModel();
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