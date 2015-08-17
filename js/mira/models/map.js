"use strict";

define([
    'underscore',
    'mira/helper',
    'mira/base/init',
    'mira/widgets/render'
], function (_, Helper, Base, Render) {

    var Model = Base.Model.extend({
        __name__ : 'Map.Model',

        parse: function(data){
            data.children = new Collection(data.children || [], {parse:true});
            return data;
        },

        getHtml: function($parent, $data, $env, $bind, callback){
            return Render.call(this, $parent, $data, $env, $bind, callback);
        },

        has_rule: function () {
            return this.get('when') != undefined;
        },

        isVisible: function($data, $env, $bind){
            if(this.get('when')) {
                return Helper.evaluate(this.get('when'), $data.attributes, $env, $data, $bind);
            }
            return true;
        },

        hasChildren: function(){
            return this.get('children').length;
        },

        buildChildren: function($parent, $data, $env, $bind, callback){

            this.get('children').each(function(map){
                map.getHtml($parent, $data, $env, $bind, function(ret){
                    if(map.hasChildren()){
                        map.buildChildren(ret.$children, $data, $env, $bind, callback)
                    }
                    callback(ret);
                });
            }, this);
        }

    });

    var Collection =  Base.Collection.extend({
        __name__ : 'Map.Collection',

        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

});