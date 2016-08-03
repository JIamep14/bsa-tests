var app = require('./app');
_ = require('underscore');
var Backbone = require('backbone');
var UserModel = require('./models/users/UserModel.js');
var BookModel = require('./models/books/BookModel.js');
var UsersController = require('./controllers/UsersController.js');
var headerView = require('./views/Header.js');
var Router = require('./routes.js');
var RouterApi = require('./router_api.js');
var LoadingView = require('./views/Loading.js');

var BookCollection = require('./models/books/BooksCollection.js');
var BooksController = require('./controllers/BooksController.js');

app.addRegions({
    main: '#main',
    header: '#header-container'
});

app.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

app.getCurrentRoute = function () {
    return Backbone.history.fragment
};

app.on('start', function () {

    new Router({
        controller: RouterApi
    });
    app.header.show(new headerView());
    console.log('App init at ' + moment().locale('en').format('LLL'));
    Backbone.history.start();

    if (this.getCurrentRoute() === "") {
        Backbone.history.navigate('user', {
            trigger: true
        });
    }

});

app.on('show:user', function (id) {
    Backbone.history.navigate('user/' + id, {
        trigger: true
    });
});

app.on('show:users', function () {
    Backbone.history.navigate('user', {
        trigger: true
    });
});

app.on('edit:user', function (id) {
    Backbone.history.navigate('user/' + id + '/edit', {
        trigger: true
    });
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

app.on('show:loading', function () {
    app.main.show(new LoadingView());
});

app.start();
