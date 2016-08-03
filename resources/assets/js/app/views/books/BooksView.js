var Marionette = require('backbone.marionette');
var BookRowView = require('./BookRowView.js');

module.exports = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-striped table-hover table-bordered",
    template: window['JST']['books_table_template.tpl'],
    childView: BookRowView,
    itemViewContainer: "tbody"
});