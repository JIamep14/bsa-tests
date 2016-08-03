var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: window['JST']['edit_book_template.tpl'],
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