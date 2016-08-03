var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: window['JST']['show_user_template.tpl'],
    ui: {
        edit: '.js-edit',
        return: '.js-return'
    },
    events: {
        'click @ui.edit': function () {
            app.trigger('edit:user', this.model.get('id'));
            //alert(123);
        },

        'click @ui.return': function () {
            var bookId = this.ui.return.val();
            alert(bookId);
        }
    }
});