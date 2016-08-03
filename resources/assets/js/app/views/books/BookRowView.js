var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'tr',
    template: window['JST']['book_tr.tpl'],

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