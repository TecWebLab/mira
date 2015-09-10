"use strict";

define([
    'underscore',
    'mira/base/init',
    'mira/models/map',
    'mira/models/structure'
], function (_, Base, Map, Structure) {

    var Model = Base.Model.extend({
        __name__ : 'Concrete.Model',


        idAttribute: 'name',

        parse: function(data){
            data.head = new Map.Collection(data.head, {parse:true});
            data.maps = new Map.Collection(data.maps, {parse:true});
            data.structure = new Structure.Collection(data.structure, {parse:true});
            return data;
        },

        buildHead: function($head, $data, $env){
            $(".navigate_remove").remove();
            this.get('head').each(function(map){
                if(map.isVisible($data, $env)){
                    map.getHtml($head, $data, $env);
                }
            });
        },

        findStructure: function(name, abstracts){
            var structure = this.get('structure').findWhere({'name': name});
            return structure;
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