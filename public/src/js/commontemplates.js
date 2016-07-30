app.module("tmps", function (tmps, app, Backbone, Marionette, $, _) {

    tmps.headerView = Marionette.ItemView.extend({
        template: '#header-template',
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
    
    tmps.loadingView = Marionette.ItemView.extend({
        template: '#loading-template'
    });

    tmps.Controller = {
        showHeader: function () {
            var view = new tmps.headerView({});
            app.header.show(view);
        },
        showLoading: function () {
            var view = new tmps.loadingView({});
            app.main.show(view);
        }
    }

});