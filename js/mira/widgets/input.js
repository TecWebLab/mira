"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return function($parent, name, $data, $env, options){
        var element = document.createElement(options.tag || 'div');
        element.id = name;

        var atrs = _.omit(options, 'tag', 'name', 'widget');

        _.each(atrs, function(value, atr){
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

        $parent.append(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});