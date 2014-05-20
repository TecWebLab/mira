"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/base/collection'
], function($, _, Backbone, ModelBase, CollectionBase) {

    var Model = ModelBase.extend({
        parse: function(data){
            return data;
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