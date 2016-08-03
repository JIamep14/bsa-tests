_ = require('underscore');
var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: window['JST']['not_exists.tpl']
});