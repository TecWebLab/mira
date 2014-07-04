"use strict";

define([
    'jsynth/widgets/render',
    'jsynth/base/init',
    'jsynth/models/api',
    'jsynth/models/selection',
    'jsynth/models/abstract',
    'jsynth/models/concrete',
    'jsynth/models/map',
    'jsynth/models/rule',
    'jsynth/application',
    'jsynth/interface',
    'jsynth/helper'
], function(
        Widget,
        Base,
        Api,
        Selection,
        Abstract,
        Concrete,
        Map,
        Rule,
        Application,
        Interface,
        Helper
    ) {

    return {
        Base: Base,
        Api: Api,
        Selection: Selection,
        Rule: Rule,
        Concrete: Concrete,
        Abstract: Abstract,
        Map : Map,
        Widget : Widget,
        Application : Application,
        Interface: Interface,
        Helper: Helper
    }
});