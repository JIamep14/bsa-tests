app = require('./app.js');
var Marionette = require('backbone.marionette');


module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        "user": "listUsers",
        'user/create': 'createUser',
        'user/:id': 'showUser',
        'user/:id/edit': 'editUser',
        'user/:id/give': 'giveBook',
        'book': 'listBooks',
        'book/create': 'createBook',
        'book/:id': 'showBook',
        'book/:id/edit': 'editBook'
    }
});

