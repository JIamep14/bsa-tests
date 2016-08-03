var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    url: function () {
        return 'api/user/' + this.get('id') + '/free';
    }
});