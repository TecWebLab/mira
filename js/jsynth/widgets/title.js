"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/widgets/render'
], function ($, _, Render) {

    return function($head, name, data, options){
        var element = null;

        element = document.createElement('title');
        element.className = 'navigate_remove'; // remove every navigate

        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.innerHTML = _.template(template, _.extend({}, options, {data:data.attributes}));
        }

        $head.prepend(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});