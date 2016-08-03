var Marionette = require('backbone.marionette');
_ = require('underscore');
var $ = require('jquery');
app = require('../app.js');


module.exports = Marionette.ItemView.extend({
    template: window['JST']['header.tpl'],
    tagName: 'nav',
    id: 'header',
    className: 'navbar navbar-inverse',
    onShow: function () {
        this.setDate();
    },
    ui: {
        showUsers: '.js-view-users',
        createusers: '.js-create-user',
        showBooks: '.js-view-books',
        createBook: '.js-create-book',
        date: '.js-date'
    },
    events: {
        'click @ui.showUsers': function () {
            this.setDate();
            app.trigger('show:users');
        },
        'click @ui.createusers': function () {
            this.setDate();
            app.trigger('create:users');
        },
        'click @ui.showBooks': function () {
            this.setDate();
            app.trigger('show:books');
        },
        'click @ui.createBook': function () {
            this.setDate();
            app.trigger('create:books');
        }
    }, setDate: function () {
        this.ui.date.text(moment().format('LLL'));
    }
});