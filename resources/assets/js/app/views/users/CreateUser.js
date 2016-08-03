var EditUserView = require('./EditUser.js');
var UserModel = require('../../models/users/UserModel.js');

module.exports = EditUserView.extend({
    events: {
        'click @ui.save' : function (e) {
            var self = this;
            self.ui.messages.empty();
            self.ui.messages.removeClass();
            e.preventDefault();
            var user = new UserModel();
            var firstname = this.ui.form.find("input[name='firstname']").val();
            var lastname = this.ui.form.find("input[name='lastname']").val();
            var email = this.ui.form.find("input[name='email']").val();
            user.unset('id');
            if (user.save({
                    firstname: firstname,
                    lastname: lastname,
                    email: email
                }, {
                    success: function (model, response, options) {
                        self.ui.messages.addClass('alert alert-dismissible alert-success');
                        self.ui.messages.append('Success');
                        app.trigger('show:user', user.get('id'));
                    },
                    error: function () {
                        self.ui.messages.addClass('alert alert-dismissible alert-warning');
                        self.ui.messages.append('Error');
                    }
                })) {
            } else {
                self.ui.messages.append('<ul>');
                $.each(user.validationError, function (key, value) {
                    self.ui.messages.find('ul').append('<li>' + value + '</li>');
                })
            }
        }
    }
});