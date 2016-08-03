var UsersController = require('./controllers/UsersController.js');

module.exports = {
    listUsers: function () {
        UsersController.listUsers();
    },
    showUser: function (id) {
        UsersController.showUser(id);
    },
    editUser: function (id) {
        UsersController.editUserView(id);
    },
    createUser: function () {
        UsersController.createUser();
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
        UsersController.giveBook(id);
    }
};