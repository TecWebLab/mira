"use strict";

define([
    'underscore',
    'jsynth/base/init',
    'jsynth/models/map'
], function (_, Base, Map) {

    var Model = Base.Model.extend({

        idAttribute: 'name',

        parse: function(data){
            data.maps = new Map.Collection(data.maps, {parse:true});
            return data;
        },

        load: function () {
            if(!this.loaded) {
                this.get('maps').invoke('load');
                this.loaded = true;
            }
        }
    });

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

});