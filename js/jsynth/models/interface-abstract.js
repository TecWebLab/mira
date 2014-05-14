"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/models/widget-abstract',
    'jsynth/collections/widget-abstract'
], function ($, _, Backbone, ModelBase, ModelWidgetAbstract, CollectionWidgetAbstract) {

    return ModelBase.extend({

        idAttribute: 'name',

        parse: function(data){
            data.widgets = new ModelWidgetAbstract(data.widgets, {parse:true});
            return data;
        },

        getAllChildren: function(){
            if(!this.allChildren){
                var children = new CollectionWidgetAbstract();
                var parent = this.get('widgets');
                parent.getAllChildren(children);
                this.allChildren = children;
            }
            return this.allChildren;
        },

        getHtml: function($parent, model){
            var parent = this.get('widgets');
            var html = parent.getHtml($parent, model);
            return html;
        }
    });

});