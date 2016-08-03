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

app.addRegions({
    main: '#main',
    header: '#header-container'
});

app.on('start', function () {
    //var Book = new BookModel({id:1});
    //Backbone.$.when(Book.fetch()).done(function (model) {
    //    alert(model.title);
    //});
    new Router({
        controller: RouterApi
    });
    app.header.show(new headerView());
    console.log('App init');
    Backbone.history.start();
});

app.on('show:user', function (id) {
    Backbone.history.navigate('user/' + id, {
        trigger: true
    });
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

app.on('show:loading', function () {
    app.main.show(new LoadingView());
});

app.reqres.setHandler("books:entities", function () {
    return BooksModels.bookAPI.getBookEntities();
});

app.reqres.setHandler('books:entity', function (id) {
    return BooksModels.bookAPI.getBookEntity(id);
});

app.reqres.setHandler("users:entities", function () {
    return UsersController.getUserEntities();
});

app.reqres.setHandler('users:entity', function (id) {
    return UsersController.getUserEntity(id);
});

app.start();
