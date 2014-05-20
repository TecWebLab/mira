"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/base/collection'
], function ($, _, Backbone, ModelBase, CollectionBase) {
    var Model = ModelBase.extend({

    });

    var Collection =  CollectionBase.extend({
        model:Model
    });


    return {
        Model : Model,
        Collection: Collection
    }

});