define([
'jquery', 'underscore', 'backbone',
'helper/app-constants'

], function ($, _, Backbone,
             AppConstants) {
    return Backbone.Model.extend({

        url: function() {
            return '/api/players/' + this.id
        },

        defaults: {
            firstName: '',
            lastName: '',
            game: 0
        },
    });
});