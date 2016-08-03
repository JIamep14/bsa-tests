var Marionette = require('backbone.marionette');
var _ = require('underscore');
var UserRowView = require('../../views/users/UserRowView.js');


module.exports = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-striped table-hover table-bordered",
    template: window['JST']['users_table_template.tpl'],
    childView: UserRowView,
    itemViewContainer: "tbody"
});