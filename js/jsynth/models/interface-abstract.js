"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/models/widget-abstract'
], function ($, _, Backbone, ModelBase, ModelWidgetAbstract) {

    return ModelBase.extend({

        idAttribute: 'name',

        parse: function(data){
            data.widgets = new ModelWidgetAbstract(data.widgets, {parse:true});
            return data;
        }
    });

});