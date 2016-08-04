var Marionette = require('backbone.marionette');
app = require('../app.js');
$ = require('jquery');

//models
var us = require('../models/users/UserModel.js');
var usCollection = require('../models/users/UsersCollection.js');
var usAndFreeBooks = require('../models/users/UserAndFreeBooksModel.js');
//views
var usersView = require('../views/users/UsersView.js');
var usView = require('../views/users/UserView.js');
var editUserView = require('../views/users/EditUser.js');
var createUserView = require('../views/users/CreateUser.js');
var giveBookView = require('../views/users/GiveBookView.js');
var notExists = require('../views/NotExists.js');

module.exports = {
    listUsers: function () {
        app.trigger('show:loading');

        var users = this.getUserEntities();
        var usersListView;
        if (users !== undefined) {
            usersListView = new usersView({
                collection: users
            });
        } else {
            usersListView = new notExists({model: new Backbone.Model({item: 'Can not fetch data from server'})});
        }
        app.main.show(usersListView);
    },

    showUser: function (id) {
        app.trigger('show:loading');

        var fetchingUser = this.getUserEntity(id);
        $.when(fetchingUser).done(function (user) {
            var userView;
            if (user !== undefined) {
                userView = new usView({
                    model: user
                });
            }
            else {
                userView = new notExists({model: new Backbone.Model({item: 'This user does not exist'})});
            }
            app.getRegion('main').show(userView);
        });

    },

    editUserView: function (id) {
        app.trigger('show:loading');
        var fetchingUser = this.getUserEntity(id);

        $.when(fetchingUser).done(function (user) {
            var userView;
            if (user !== undefined) {
                userView = new editUserView({
                    model: user
                });

            }
            else {
                userView = new notExists({model: new Backbone.Model({item: 'This user does not exist.'})});
            }

            app.getRegion('main').show(userView);
        });
    },

    createUser: function () {
        var view = new createUserView({model: new us()});
        app.main.show(view);
    },

    giveBook: function (id) {
        app.trigger('show:loading');

        var user = new usAndFreeBooks({id: id});
        user.fetch().then(function () {
            var view = new giveBookView({
                model: user
            });
            app.getRegion('main').show(view);
        });

    },

    getUserEntities: function () {
        var users = new usCollection();
        users.fetch();
        return users;

    },
    getUserEntity: function (userId) {
        var user = new us({id: userId});
        var defer = $.Deferred();
        user.fetch({
            success: function (data) {
                defer.resolve(data);
            },
            error: function (data) {
                defer.resolve(undefined);
            }
        });
        return defer.promise();
    }
};