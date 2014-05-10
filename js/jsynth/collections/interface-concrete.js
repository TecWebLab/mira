"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/interface-concrete'
], function ($, _, Backbone, CollectionBase, ModelInterfaceConcrete) {
    return CollectionBase.extend({
        model: ModelInterfaceConcrete
    });

});