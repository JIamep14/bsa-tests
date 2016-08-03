var Marionette = require('backbone.marionette');
var BooksController = require('../../controllers/BooksController.js');
module.exports = Marionette.ItemView.extend({
    template: window['JST']['give_book_template.tpl'],
    ui: {
        select: '#select',
        submit: '.js-submit'
    },
    events: {
        'click @ui.submit': function (e) {
            var self = this;
            var user_id = self.model.get('id');
            e.preventDefault();
            var book_id = this.ui.select.val();
            if(book_id == 0) alert('Choose book');
            else {
                var fetchingBook = BooksController.getBookEntity(book_id);
                $.when(fetchingBook).done(function (book) {
                    book.save({user_id: user_id}, {validate: false}).then(function () {
                        app.trigger('show:user', user_id);
                    })
                });
            }
        }
    }
});