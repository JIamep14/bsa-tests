app.module("UsersApp", function (UsersApp, app, Backbone, Marionette, $, _) {

    UsersApp.Controller = {
        listUsers: function () {

            var users = app.request('users:entities');

            var usersListView = new UsersApp.Users({
                collection: users
            });

            app.main.show(usersListView);
        },
        showUser: function (id) {
            var fetchingUser = app.request('users:entity', id);
            app.tmps.Controller.showLoading();

            $.when(fetchingUser).done(function (user) {
                var userView;
                if (user !== undefined) {
                    userView = new UsersApp.ShowUser({
                        model: user
                    });
                }
                else {
                    userView = new UsersApp.NotExists({});
                }
                app.getRegion('main').show(userView);
            });
            // getUsers: function () {
            //     app.users = app.request('users:entities');
            // }

        },

        editUserView: function (id) {
            var fetchingUser = app.request('users:entity', id);
            app.tmps.Controller.showLoading();

            $.when(fetchingUser).done(function (user) {
                var userView;
                if (user !== undefined) {
                    userView = new UsersApp.EditUser({
                        model: user
                    });
                    
                }
                else {
                    userView = new UsersApp.NotExists({});
                }

                app.getRegion('main').show(userView);
            });
        },

        createUser: function () {
            var view = new UsersApp.CreateUser({model: new app.Entities.User()});
            app.main.show(view);
        },

        giveBook: function (id) {
            app.tmps.Controller.showLoading();
            var user = new app.Entities.UserAndFreeBooks({id: id});
            user.fetch().then(function () {
                var view = new UsersApp.GiveBook({
                    model: user
                });
                app.getRegion('main').show(view);
            });



        }
    }
});