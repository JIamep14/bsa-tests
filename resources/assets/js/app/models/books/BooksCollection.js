var Backbone  = require('backbone');
var BookModel = require('./BookModel.js');
module.exports = Backbone.Collection.extend({
    model: BookModel,
    url: 'api/book'
});