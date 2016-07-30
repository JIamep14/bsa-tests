app.module("Entities", function (Entities, app, Backbone, Marionette, $, _) {

    Entities.User = Backbone.Model.extend({
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

    Entities.UserCollection = Backbone.Collection.extend({
        model: Entities.User,
        url: 'api/user'
    });

    Entities.UserAndFreeBooks = Backbone.Model.extend({
        url: function () {
            return 'api/user/' + this.get('id') + '/free';
        }
    });

    var userAPI = {
        getUserEntities: function () {
            var users = new Entities.UserCollection();
            users.fetch().then(null, function () {
                alert('I can not fetch data =(');
            });
            return users;
        },
        getUserEntity: function (userId) {
            var user = new Entities.User({id: userId});
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
    }

    app.reqres.setHandler("users:entities", function () {
        return userAPI.getUserEntities();
    });

    app.reqres.setHandler('users:entity', function (id) {
        return userAPI.getUserEntity(id);
    })
});

