"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/widget-concrete'
], function ($, _, Backbone, CollectionBase, ModelWidgetAbstract) {

    return CollectionBase.extend({
        model: ModelWidgetAbstract
    });

});