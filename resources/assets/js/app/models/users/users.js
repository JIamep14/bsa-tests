var Backbone = require('backbone');
var _ = require('underscore');

module.exports.User = Backbone.Model.extend({
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

module.exports.UserCollection = Backbone.Collection.extend({
    model: this.User,
    url: 'api/user'
});

module.exports.UserAndFreeBooks = Backbone.Model.extend({
    url: function () {
        return 'api/user/' + this.get('id') + '/free';
    }
});

module.exports.userAPI = {
    getUserEntities: function () {
        var users = new this.UserCollection();
        users.fetch().then(null, function () {
            alert('I can not fetch data =(');
        });
        return users;
    },
    getUserEntity: function (userId) {
        var user = new this.User({id: userId});
        var defer = $.Deferred();
        //setTimeout(function () {
        user.fetch({
            success: function (data) {
                defer.resolve(data);
            },
            error: function (data) {
                defer.resolve(undefined);
            }
        });
        //}, 500);
        return defer.promise();
    }
};