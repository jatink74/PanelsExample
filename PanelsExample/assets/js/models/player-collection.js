define([
"jquery", "underscore", "backbone"
, "models/player"
], function (
    $, _, Backbone, 
    PlayerModel
) {
    return Backbone.Collection.extend({
        
        url: "/api/players",

        model: PlayerModel
        
    });
});