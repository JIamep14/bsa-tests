var Marionette = require('backbone.marionette');
_ = require('underscore');
var $ = require('jquery');
app = require('../app.js');


module.exports = Marionette.ItemView.extend({
    //template: '#header-template',
    template: window['JST']['header.tpl'],
    //template: _.template(JST["resources/assets/js/app/templates/header.tpl"]).html(),
    tagName: 'nav',
    id: 'header',
    className: 'navbar navbar-inverse',
    ui: {
        showUsers: '.js-view-users',
        createusers: '.js-create-user',
        showBooks: '.js-view-books',
        createBook: '.js-create-book'
    },
    events: {
        'click @ui.showUsers': function () {
            app.trigger('show:users');
        },
        'click @ui.createusers': function () {
            app.trigger('create:users');
        },
        'click @ui.showBooks': function () {
            app.trigger('show:books');
        },
        'click @ui.createBook': function () {
            app.trigger('create:books');
        }
    }
});