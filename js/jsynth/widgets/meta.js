"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/helper'
], function ($, _, Helper) {

    return function($head, name, $data, $env, options){
        var element = null;

        element = document.createElement('meta');
        element.name = name;
        element.className = 'navigate_remove'; // remove every navigate
        var attrs = _.omit(options, 'name', 'widget');

        _.each(attrs, function(value, atr){
            var template = "<%= " + value + '%>';
            try {
                var build = _.template(template, _.extend({}, options,
                        {$data:$data.attributes, $env:$env, $dataObj: $data})
                );
                element.setAttribute(atr,  build)
            } catch (ex){
                element.setAttribute(atr,  value)
            }
        });

        $head.prepend(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});