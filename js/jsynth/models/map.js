"use strict";

define([
    'underscore',
    'jsynth/helper',
    'jsynth/base/init',
    'jsynth/widgets/render'
], function (_, Helper, Base, Render) {

    var Model = Base.Model.extend({
        __name__ : 'Map.Model',


        initialize: function(){
            _.bindAll(this, 'bindRender')
        },

        load: function(){
            if(this.render) {
                return;
            }
            var widget_type = this.get('widget');
            Render.load(widget_type, this.bindRender);
        },

        bindRender: function(render){
            this.render = render;
            var esse = this;
            Render.load(this.get('widget'), function(func){
                esse.render = func;
            });
            _.bindAll(this, 'render');
        },

        getHtml: function($parent, data, request, devive){
            return this.render($parent, this.get('name'), data, this.attributes)
        },

        has_rule: function () {
            return this.get('when') != undefined;
        },

        isVisible: function(data, request, device){
            if(this.get('when')) {
                return Helper.evaluate(this.get('when'), data.attributes, request, device);
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