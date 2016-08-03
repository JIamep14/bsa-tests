var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: window['JST']['edit_user_template.tpl'],
    ui: {
        save: '.js-save',
        messages: '.messages',
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
            var firstname = this.ui.form.find("input[name='firstname']").val();
            var lastname = this.ui.form.find("input[name='lastname']").val();
            var email = this.ui.form.find("input[name='email']").val();
            if (this.model.save({
                    id: id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                }, {
                    success: function (model, response, options) {
                        self.ui.messages.addClass('alert alert-dismissible alert-success');
                        self.ui.messages.append('Success');
                        app.trigger('show:user', self.model.get('id'));
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