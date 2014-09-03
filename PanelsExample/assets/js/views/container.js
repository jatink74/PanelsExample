define([
    "jquery", "underscore", "backbone"
    , "models/player-collection", "models/player"
    , "views/player-list" 
    , "text!templates/container.html" 
    , "helper/pubsub"
], function (
    $, _, Backbone, 
    PlayerCollection, PlayerModel, 
    PlayerListView, 
    _containerTemplate,
    PubSub
) {
    return Backbone.View.extend ({

        tagName: "div",
            
        initialize: function () {
            _.bindAll(this, 'render', 'newPlayer', 'saveChoices');
            this.template = _.template(_containerTemplate);

            this.playerCollection = new PlayerCollection();
            this.playerCollection.fetch({
                success: function () {
                    this.$('#addNew').removeAttr('disabled');
                }
            });
            this.playerListView = new PlayerListView({ collection: this.playerCollection });
            PubSub.on("EnableSave", this.enableSave, this);
            this.render();
        },
        
        events: {
            'click #addNew': 'newPlayer',
            'click #saveChoices': 'saveChoices'
        },
        
        render: function () {
            this.$el.append(this.template());
            this.$('.panels').append(this.playerListView.el);
            this.delegateEvents();
        },
        
        newPlayer: function () {
            this.playerListView.addPlayer(new PlayerModel());
        },
        
        saveChoices: function () {
            this.$('#jsonResultArea').empty();
            this.$('#jsonResultArea').append(JSON.stringify(this.playerCollection));
            self = this;
            $.ajax({
                url: "/api/Players",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(this.playerCollection),
                success: function (resp) {
                    self.playerCollection.fetch();
                    alert("Players Save Successfully");
                },
                error: function () {
                    alert("Error Saving Form");
                }
            });
        },

        enableSave: function (toEnable) {
            if (toEnable) {
                this.$('#saveChoices').removeAttr('disabled');
            } else {
                this.$('#saveChoices').attr('disabled', 'disabled');
            }
        }
    });
});