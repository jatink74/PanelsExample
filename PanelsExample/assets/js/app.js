define([
       "jquery" , "underscore" , "backbone"
       , "views/container"  
], function(
  $, _, Backbone
  , ContainerView
){
  return {
    initialize: function(){
        new ContainerView({el: '#wrapper'});
    }
  }
});
