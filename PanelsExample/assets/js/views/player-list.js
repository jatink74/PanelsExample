define([
    "jquery", "underscore", "backbone"
    , "models/player"
    , "views/player"
    , "helper/pubsub"
], function (
    $, _, Backbone,
    PlayerModel,
    PlayerView,
    PubSub
) {
    return Backbone.View.extend({
        tagName: "table",

        initialize: function () {
            _.bindAll(this, 'render', 'addPlayer');
            this.collection.on("add", this.render, this);
            this.collection.on("remove", this.render, this);
            this.collection.on("change", this.render, this);
            this.render();
        },

        render: function () {
            self = this;
            this.$el.empty();
            this.$el.append("<tr><th>First Name</th><th>Last Name</th><th>Game</th></tr>");
            this.collection.each(function (player) {
                self.$el.append(new PlayerView({
                    model: player
                }).render().el);
            });
            PubSub.trigger("EnableSave", this.collection.length > 0);
            this.delegateEvents();
            return this;
        },

        addPlayer: function (model) {
            this.collection.add(model);
        }
    });
});