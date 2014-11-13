"use strict";

define([
    'underscore',
    'mira/helper',
    'mira/base/init',
    'mira/widgets/render'
], function (_, Helper, Base, Render) {

    var Model = Base.Model.extend({
        __name__ : 'Map.Model',

        getHtml: function($parent, $data, $env){
            return Render.call(this, $parent, $data, $env);
        },

        has_rule: function () {
            return this.get('when') != undefined;
        },

        isVisible: function($data, $env){
            if(this.get('when')) {
                return Helper.evaluate(this.get('when'), $data.attributes, $env);
            }
            return true;
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