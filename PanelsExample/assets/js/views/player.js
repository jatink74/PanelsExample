define([
    "jquery", "underscore", "backbone"
    , "text!templates/player.html"
    , "helper/app-constants"

], function (
    $, _, Backbone,
    _playerTemplate,
     AppConstants
) {
    return Backbone.View.extend({
        tagName: "tr",

        initialize: function () {
            _.bindAll(this, 'render', 'deletePlayer', 'firstNameChanged','lastNameChanged','gameChanged');
            this.template = _.template(_playerTemplate);
            this.games = AppConstants.Games;
        },
        
        events: {
            'click .deletePlayer': 'deletePlayer',
            "change input[name='firstName']":  "firstNameChanged",
            "change input[name='lastName']":  "lastNameChanged",
            "change select": "gameChanged",
        },

        render: function () {
            var data = {model: this.model, games: this.games};
            this.$el.append(this.template(data));
            this.delegateEvents();
            return this;
        },
        
        deletePlayer: function() {
            if (this.model.id) {
                Backbone.sync('delete', this.model);
            }
            this.model.collection.remove(this.model.cid);
        },
        
        firstNameChanged: function(e) {
            var val = $(e.currentTarget).val();
            this.model.set({firstName: val});
        },
        
        lastNameChanged: function(e) {
            var val = $(e.currentTarget).val();
            this.model.set({lastName: val});
        },

        gameChanged: function(e) {
            var val = $(e.currentTarget).val();
            this.model.set({ game: val });
        },
    });
});