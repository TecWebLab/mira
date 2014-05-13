"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/widgets/render',
    'jsynth/base/model',
    'jsynth/base/collection',
    'jsynth/models/api',
    'jsynth/collections/api',
    'jsynth/models/route',
    'jsynth/collections/route',
    'jsynth/models/route-rule',
    'jsynth/collections/route-rule',
    'jsynth/models/interface-abstract',
    'jsynth/collections/interface-abstract',
    'jsynth/models/widget-abstract',
    'jsynth/collections/widget-abstract',
    'jsynth/models/widget-concrete',
    'jsynth/collections/widget-concrete',
    'jsynth/models/interface-concrete',
    'jsynth/collections/interface-concrete'
], function($, _, Backbone,
        Widget,
        ModelBase,
        CollectionBase,
        ModelApi,
        CollectionApi,
        ModelRoute,
        CollectionRoute,
        ModelRouteRule,
        CollectionRouteRole,
        ModelInterfaceAbstract,
        CollectionInterfaceAbstract,
        ModelWidgetAbstract,
        CollectionWidgetAbstract,
        ModelWidgetConcrete,
        CollectionWidgetConcrete,
        ModelInterfaceConcrete,
        CollectionInterfaceConcrete
    ) {

    return {
        ModelBase: ModelBase,
        CollectionBase: CollectionBase,
        Api: {
            Model: ModelApi,
            Collection: CollectionApi
        },
        Route: {
            Model: ModelRoute,
            Collection: CollectionRoute,
            Rule: {
                Model: ModelRouteRule,
                Collection: CollectionRouteRole
            }
        },
        InterfaceAbstract: {
            Model: ModelInterfaceAbstract,
            Collection: CollectionInterfaceAbstract,
            Widget: {
                Model: ModelWidgetAbstract,
                Collection: CollectionWidgetAbstract
            }
        },
        InterfaceConcrete :{
            Model: ModelInterfaceConcrete,
            Collection: CollectionInterfaceConcrete,
            Widget: {
                Model: ModelWidgetConcrete,
                Collection: CollectionWidgetConcrete
            }
        },
        Widget : Widget
    }
});