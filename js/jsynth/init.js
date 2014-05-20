"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/widgets/render',
    'jsynth/base/model',
    'jsynth/base/collection',
    'jsynth/models/api',
    'jsynth/models/route',
    'jsynth/models/interface-abstract',
    'jsynth/models/interface-concrete',
    'jsynth/models/rule'
], function($, _, Backbone,
        Widget,
        ModelBase,
        CollectionBase,
        Api,
        Route,
        InterfaceAbstract,
        InterfaceConcrete,
        Rule
    ) {

    return {
        ModelBase: ModelBase,
        CollectionBase: CollectionBase,
        Api: Api,
        Rule: Rule,
        Route: Route,
        InterfaceAbstract: InterfaceAbstract,
        InterfaceConcrete : InterfaceConcrete,
        Widget : Widget
    }
});