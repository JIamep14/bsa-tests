var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: window['JST']['show_book_template.tpl'],
    ui: {
        edit: '.js-edit',
        return: '.js-return'
    },
    events: {
        'click @ui.edit': function () {
            app.trigger('edit:book', this.model.get('id'));
        },
        'click @ui.return': function (e) {
            var book_id = this.model.get('id');
            this.model.save({user_id: 0, attached: 0}, {validate: false}).then(function(){
                app.trigger('show:book', book_id);
            } ,function() {
                alert('Some server error. Try later.');
            });
        }
    },
    modelEvents: {
        'change': 'render'
    }
});