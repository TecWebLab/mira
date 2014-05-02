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
            if(_.isArray(data.children)){
                data.children = new CollectionWidgetAbstract(data.children, {parse:true})
            }
            return data;
        },

        can_has_children: function(){
            return _.indexOf(['CompositeInterfaceElement', 'AbstractInterface'], this.get('widget_type')) > -1
        }
    });

});