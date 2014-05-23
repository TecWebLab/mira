"use strict";

define([
    'jsynth/widgets/render',
    'jsynth/base/init',
    'jsynth/models/api',
    'jsynth/models/abstract',
    'jsynth/models/concrete',
    'jsynth/models/map',
    'jsynth/models/rule',
    'jsynth/application',
    'jsynth/interface'
], function(
        Widget,
        Base,
        Api,
        Abstract,
        Concrete,
        Map,
        Rule,
        Application,
        Interface
    ) {

    return {
        Base: Base,
        Api: Api,
        Rule: Rule,
        Concrete: Concrete,
        Abstract: Abstract,
        Map : Map,
        Widget : Widget,
        Application : Application,
        Interface: Interface
    }
});