"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/helper'
], function ($, _, Helper) {

    return function($head, name, $data, $env, options){
        var element = null;

        element = document.createElement('title');
        element.className = 'navigate_remove'; // remove every navigate

        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.innerHTML = _.template(template, _.extend({}, options,
                {$data:$data.attributes, $env:$env, $dataObj: $data}));
        }

        $head.prepend(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});