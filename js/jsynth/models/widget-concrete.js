"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/base/collection',
    'jsynth/widgets/render'
], function ($, _, Backbone, ModelBase, CollectionBase, Render) {

    var Model = ModelBase.extend({

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
            _.bindAll(this, 'render');
        },

        getHtml: function($parent, model){
            return this.render($parent, this.get('name'), model, this.attributes)
        },

        has_rule: function () {
            return this.get('when') != undefined;
        },

        evaluate: function(options){
            var rule = Gus.interface.rules.get(this.get('when'));
            var ret = rule.evaluate(options.model.attributes, options.request, options.device);
            return ret
        }

    });

    var Collection =  CollectionBase.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

});