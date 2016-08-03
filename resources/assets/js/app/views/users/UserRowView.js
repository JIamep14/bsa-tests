var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'tr',
    template: window['JST']['user_tr.tpl'],

    ui: {
        show: '.js-show',
        edit: '.js-edit',
        give: '.js-give',
        delete: '.js-delete'
    },

    events: {
        'click @ui.show': 'showClicked',
        'click @ui.edit': 'editClicked',
        'click @ui.give': 'giveClicked',
        'click @ui.delete': "deleteClicked"
    },

    showClicked: function (e) {
        app.trigger('show:user', this.model.get('id'));
    },
    editClicked: function (e) {
        app.trigger('edit:user', this.model.get('id'));
    },
    giveClicked: function (e) {
        app.trigger('give:book', this.model.get('id'));
    },
    deleteClicked: function (e) {
        this.model.destroy();
    },

    remove: function () {
        this.$el.fadeOut();
    }

});