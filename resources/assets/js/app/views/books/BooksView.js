module.exports = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-striped table-hover table-bordered",
    template: "#books-table-template",
    childView: BooksApp.Book,
    itemViewContainer: "tbody"
});