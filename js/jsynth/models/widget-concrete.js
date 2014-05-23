"use strict";

define([
    'underscore',
    'jsynth/base/init',
    'jsynth/widgets/render'
], function (_, Base, Render) {

    var Model = Base.Model.extend({

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

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }

});