"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/base/collection',
    'jsynth/models/widget-abstract'
], function ($, _, Backbone, ModelBase, CollectionBase, WidgetAbstract) {

    var Model = ModelBase.extend({

        idAttribute: 'name',

        parse: function(data){
            data.widgets = new WidgetAbstract.Model(data.widgets, {parse:true});
            return data;
        },

        getAllChildren: function(){
            if(!this.allChildren){
                var children = new WidgetAbstract.Collection();
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

    var Collection =  CollectionBase.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection,
        Widget: WidgetAbstract
    }


});