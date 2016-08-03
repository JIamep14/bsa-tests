module.exports = Marionette.ItemView.extend({
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