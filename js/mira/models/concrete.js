"use strict";

define([
    'underscore',
    'mira/base/init',
    'mira/models/map'
], function (_, Base, Map) {

    var Model = Base.Model.extend({
        __name__ : 'Concrete.Model',


        idAttribute: 'name',

        parse: function(data){
            data.head = new Map.Collection(data.head, {parse:true});
            data.maps = new Map.Collection(data.maps, {parse:true});
            return data;
        },

        load: function () {
            if(!this.loaded) {
                this.get('maps').invoke('load');
                this.get('head').invoke('load');
                this.loaded = true;
            }
        },

        buildHead: function($head, $data, $env){
            $(".navigate_remove").remove();
            this.get('head').each(function(map){
                if(map.isVisible($data, $env)){
                    map.getHtml($head, $data, $env);
                }
            });
        }
    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Concrete.Collection',

        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

});