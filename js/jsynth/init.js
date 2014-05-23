"use strict";

define([
    'jsynth/widgets/render',
    'jsynth/base/init',
    'jsynth/models/api',
    'jsynth/models/route',
    'jsynth/models/interface-abstract',
    'jsynth/models/interface-concrete',
    'jsynth/models/rule',
    'jsynth/application',
    'jsynth/interface'
], function(
        Widget,
        Base,
        Api,
        Route,
        InterfaceAbstract,
        InterfaceConcrete,
        Rule,
        Application,
        Interface
    ) {

    return {
        Base: Base,
        Api: Api,
        Rule: Rule,
        Route: Route,
        InterfaceAbstract: InterfaceAbstract,
        InterfaceConcrete : InterfaceConcrete,
        Widget : Widget,
        Application : Application,
        Interface: Interface
    }
});