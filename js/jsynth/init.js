"use strict";

define([
    'mira/widgets/render',
    'mira/base/init',
    'mira/models/api',
    'mira/models/selection',
    'mira/models/abstract',
    'mira/models/concrete',
    'mira/models/map',
    'mira/models/rule',
    'mira/application',
    'mira/interface',
    'mira/helper'
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