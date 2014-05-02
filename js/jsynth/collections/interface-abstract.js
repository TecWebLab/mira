"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/interface-abstract'
], function ($, _, Backbone, CollectionBase, ModelInterfaceAbstract) {
    return CollectionBase.extend({
        model: ModelInterfaceAbstract
    });

});