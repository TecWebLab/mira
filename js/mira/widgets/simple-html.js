"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return function($parent, name, $context, options, callback, ignored_options){
        var element = document.createElement(options.tag || 'div');
        element.id = name;


        var atrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'events', ignored_options);

        var context = Helper.build_context($context, options);
        Helper.build_attributes(element, atrs, context);

        if(options.value) {
            element.innerHTML = Helper.build_value(options.value, context);
        }

        $parent.append(element);
        var $element = $(element);

        if(options.events) {
            Helper.build_events($element, options.events, context);
        }

        if(callback){
            callback({
                $children: $element,
                $element: $element,
                html: element.innerHTML
            })
        }
    };
});