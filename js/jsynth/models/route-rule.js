"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model'
], function($, _, Backbone, ModelBase) {

    return ModelBase.extend({
        parse: function(data){
            return data;
        }
    });
});