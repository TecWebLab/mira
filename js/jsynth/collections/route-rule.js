"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/route-rule'
], function($, _, Backbone, CollectionBase, ModelRouteRules) {

    return CollectionBase.extend({
        model: ModelRouteRules,
        parse: function(data){
            return data;
        }
    });
});