var Backbone = require('backbone');
var UserModel = require('./UserModel.js');

module.exports = Backbone.Collection.extend({
    model: UserModel,
    url: 'api/user'
});