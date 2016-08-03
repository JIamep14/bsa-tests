var Backbone  = require('backbone');

module.exports = Backbone.Model.extend({
    urlRoot: 'api/user',
    defaults: {
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        books: {
            id: '',
            title: '',
            author: '',
            genre:'',
            year:''
        }
    },
    validate: function (attrs, options) {
        var errors = {};
        if (!attrs.firstname || !attrs.firstname.match(/^[a-zA-Z]+$/) || attrs.firstname.length < 3) {
            errors.firstname = 'First Name params: Min 3 characters, only letters, required';
        }

        if (!attrs.lastname || !attrs.lastname.match(/^[a-zA-Z]+$/) || attrs.lastname.length < 3)
        {
            errors.lastname = 'Last Name params: Min 3 characters, only letters, required';
        }

        if (!attrs.email || !attrs.email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))
        {
            errors.email = 'Email is invalid';
        }
        if(!_.isEmpty(errors)) {
            return errors;
        }
    }
});