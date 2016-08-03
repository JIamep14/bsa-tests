var UsersController = require('./controllers/UsersController.js');
var BooksController = require('./controllers/BooksController.js');

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
        BooksController.listBooks();
    },
    showBook: function (id) {
        BooksController.showBook(id);
    },
    editBook: function (id) {
        BooksController.editBookView(id);
    },
    createBook: function () {
        BooksController.createBook();
    },
    giveBook: function (id) {
        UsersController.giveBook(id);
    }
};