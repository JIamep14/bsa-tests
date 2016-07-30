app.module("UsersApp", function (UsersApp, app, Backbone, Marionette, $, _) {

    UsersApp.User = Marionette.ItemView.extend({
        tagName: 'tr',
        template: '#user-tr',

        ui: {
            show: '.js-show',
            edit: '.js-edit',
            give: '.js-give',
            delete: '.js-delete'
        },

        events: {
            'click @ui.show': 'showClicked',
            'click @ui.edit': 'editClicked',
            'click @ui.give': 'giveClicked',
            'click @ui.delete': "deleteClicked"
        },

        showClicked: function (e) {
            app.trigger('show:user', this.model.get('id'));
        },
        editClicked: function (e) {
            app.trigger('edit:user', this.model.get('id'));
        },
        giveClicked: function (e) {
            app.trigger('give:book', this.model.get('id'));
        },
        deleteClicked: function (e) {
            this.model.destroy();
        },

        remove: function () {
            this.$el.fadeOut();
        }

    });

    UsersApp.GiveBook = Marionette.ItemView.extend({
        template: '#give-book-template',
        ui: {
            select: '#select',
            submit: '.js-submit'
        },
        events: {
            'click @ui.submit': function (e) {
                var self = this;
                var user_id = self.model.get('id');
                e.preventDefault();
                var book_id = this.ui.select.val();
                if(book_id == 0) alert('Choose book');
                else {
                    var fetchingBook = app.request('books:entity', book_id);
                    $.when(fetchingBook).done(function (book) {
                        book.save({user_id: user_id}, {validate: false}).then(function () {
                            app.trigger('show:user', user_id);
                        })
                    });
                }
            }
        }
    });
    
    
    UsersApp.ShowUser = Marionette.ItemView.extend({
        template: '#user-view',
        ui: {
            edit: '.js-edit',
            return: '.js-return'
        },
        events: {
            'click @ui.edit': function () {
                app.trigger('edit:user', this.model.get('id'));
                //alert(123);
            },

            'click @ui.return': function () {
                var bookId = this.ui.return.val();
                alert(bookId);
            }
        }
    });

    UsersApp.NotExists = Marionette.ItemView.extend({
        template: '#user-not-exist'
    });

    UsersApp.Users = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-striped table-hover table-bordered",
        template: "#users-table-template",
        childView: UsersApp.User,
        itemViewContainer: "tbody"
    });

    UsersApp.EditUser = Marionette.ItemView.extend({
        template: '#edit-user-template',
        ui: {
            save: '.js-save',
            messages: '.messages',
            form: 'form'
        },
        modelEvents: {
            'change': 'render'
        },
        events: {
            'click @ui.save': function (e) {

                var self = this;
                self.ui.messages.empty();
                self.ui.messages.removeClass();
                e.preventDefault();
                var id = this.ui.form.find("input[name='id']").val();
                var firstname = this.ui.form.find("input[name='firstname']").val();
                var lastname = this.ui.form.find("input[name='lastname']").val();
                var email = this.ui.form.find("input[name='email']").val();
                if (this.model.save({
                        id: id,
                        firstname: firstname,
                        lastname: lastname,
                        email: email
                    }, {
                        success: function (model, response, options) {
                            self.ui.messages.addClass('alert alert-dismissible alert-success');
                            self.ui.messages.append('Success');
                            app.trigger('show:user', self.model.get('id'));
                        },
                        error: function () {
                            self.ui.messages.addClass('alert alert-dismissible alert-warning');
                            self.ui.messages.append('Error');
                        }
                    })) {
                } else {
                    self.ui.messages.append('<ul>');
                    $.each(this.model.validationError, function (key, value) {
                        self.ui.messages.find('ul').append('<li>' + value + '</li>');
                    })
                }
            }
        }
    });

    UsersApp.CreateUser = UsersApp.EditUser.extend({
        events: {
            'click @ui.save' : function (e) {
                var self = this;
                self.ui.messages.empty();
                self.ui.messages.removeClass();
                e.preventDefault();
                var user = new app.Entities.User();
                var firstname = this.ui.form.find("input[name='firstname']").val();
                var lastname = this.ui.form.find("input[name='lastname']").val();
                var email = this.ui.form.find("input[name='email']").val();
                user.unset('id');
                if (user.save({
                        firstname: firstname,
                        lastname: lastname,
                        email: email
                    }, {
                        success: function (model, response, options) {
                            self.ui.messages.addClass('alert alert-dismissible alert-success');
                            self.ui.messages.append('Success');
                            app.trigger('show:user', user.get('id'));
                        },
                        error: function () {
                            self.ui.messages.addClass('alert alert-dismissible alert-warning');
                            self.ui.messages.append('Error');
                        }
                    })) {
                } else {
                    self.ui.messages.append('<ul>');
                    $.each(user.validationError, function (key, value) {
                        self.ui.messages.find('ul').append('<li>' + value + '</li>');
                    })
                }
            }
        }
    });

});
