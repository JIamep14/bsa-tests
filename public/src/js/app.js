var app = new Marionette.Application();

app.addRegions({
    main: '#main',
    header: '#header-container',
    submain: '#submain'
});

app.Router = Marionette.AppRouter.extend({
    appRoutes: {
        "user": "listUsers",
        'user/create':'createUser',
        'user/:id': 'showUser',
        'user/:id/edit': 'editUser',
        'user/:id/give': 'giveBook',
        'book': 'listBooks',
        'book/create': 'createBook',
        'book/:id': 'showBook',
        'book/:id/edit': 'editBook'

    }
});

api = {
    listUsers: function () {
        app.UsersApp.Controller.listUsers();
    },
    showUser: function (id) {
        app.UsersApp.Controller.showUser(id);
    },
    editUser: function (id) {
        app.UsersApp.Controller.editUserView(id);
    },
    createUser: function () {
        app.UsersApp.Controller.createUser();
    },
    listBooks: function () {
        app.BooksApp.Controller.listBooks();
    },
    showBook: function (id) {
        app.BooksApp.Controller.showBook(id);
    },
    editBook: function (id) {
        app.BooksApp.Controller.editBookView(id);
    },
    createBook: function () {
        app.BooksApp.Controller.createBook();
    },
    giveBook: function (id) {
        app.UsersApp.Controller.giveBook(id);
    }
};

app.on('show:user', function (id) {
    Backbone.history.navigate('user/' + id, {
        trigger: true
    })
    //app.navigate('user/' + id);
    //api.showUser(id);
});

app.on('show:users', function () {
    Backbone.history.navigate('user', {
        trigger: true
    });
    //app.navigate('user');
    //api.listUsers();
});

app.on('edit:user', function (id) {
    Backbone.history.navigate('user/' + id + '/edit', {
        trigger: true
    });
    //app.navigate('user/' + id + '/edit');
    //api.editUser(id);
});

app.on('show:books', function () {
    Backbone.history.navigate('book', {
        trigger: true
    });
});

app.on('show:book', function (id) {
    Backbone.history.navigate('book/' + id, {
        trigger: true
    });
});

app.on('edit:book', function (id) {
    Backbone.history.navigate('book/' + id + '/edit', {
        trigger: true
    });
});

app.on('create:users', function () {
    Backbone.history.navigate('user/create', {
        trigger: true
    });
});

app.on('create:books', function () {
    Backbone.history.navigate('book/create', {
        trigger: true
    });
});

app.on('give:book', function (id) {
    Backbone.history.navigate('user/' + id + '/give', {
        trigger: true
    });
});

app.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

app.getCurrentRoute = function () {
    return Backbone.history.fragment
};

app.on("start", function () {
    app.tmps.Controller.showHeader();
    new app.Router({
        controller: api
    });

    if (Backbone.history) {
        Backbone.history.start();

        if (this.getCurrentRoute() === "") {
            this.navigate("user");
            app.UsersApp.Controller.listUsers();
        }
    }

});

