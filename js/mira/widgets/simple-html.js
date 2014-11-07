"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return function($parent, name, $data, $env, options, ignored_options){
        var element = document.createElement(options.tag || 'div');
        element.id = name;

        var atrs = _.omit(options, 'tag', 'value', 'name', 'widget', ignored_options);
        var context = Helper.build_context($data, $env, options);
        Helper.build_attributes(element, atrs, context);

        if(options.value) {
            element.innerHTML = Helper.build_value(options.value, context);
        }

        $parent.append(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});