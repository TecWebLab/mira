"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model'
], function ($, _, Backbone, ModelBase) {

    return ModelBase.extend({

        idAttribute: 'name',

        parse: function(data){
            var CollectionWidgetAbstract = require('jsynth/collections/widget-abstract');
            data.children = new CollectionWidgetAbstract(data.children || [], {parse:true});
            return data;
        },

        can_has_children: function(){
            return _.indexOf(['CompositeInterfaceElement', 'AbstractInterface'], this.get('widget')) > -1
        },
        
        getAllChildren: function (children) {
            if(!children){
                var CollectionWidgetAbstract = require('jsynth/collections/widget-abstract');
                children = new CollectionWidgetAbstract();
            }
            children.add(this);
            this.get('children').each(function(widget){
                children.add(widget.getAllChildren(children));
            }, this);
            return children;
        },

        getHtml: function($parent, model){
            if(this.get('concrete')) {
                var ret = this.get('concrete').getHtml($parent, model);
                this.get('children').each(function (widget) {
                    widget.getHtml(ret.$children, model);
                }, this);
                return ret;
            }

        }
    });

});