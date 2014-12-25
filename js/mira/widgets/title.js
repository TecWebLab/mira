"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return function($head, name, $context, options){
        var element = null;

        element = document.createElement('title');
        element.className = 'navigate_remove'; // remove every navigate

        var context = Helper.build_context($context, options);

        if(options.value) {
            element.innerHTML = Helper.build_value(options.value, context);
        }

        $head.prepend(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});