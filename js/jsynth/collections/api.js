"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/api'
], function ($, _, Backbone, CollectionBase, ModelApi) {

    return CollectionBase.extend({
        model:ModelApi,
        name: "Cooool"
    });

});