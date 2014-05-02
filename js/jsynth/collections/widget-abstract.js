"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/collection',
    'jsynth/models/widget-abstract'
], function ($, _, Backbone, CollectionBase, ModelWidgetAbstract) {

    return CollectionBase.extend({
        model: ModelWidgetAbstract
    });

});