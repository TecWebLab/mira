"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/widgets/render'
], function ($, _, Render) {

    return function($parent, name, model, options){

        var element = document.createElement(options.tag || 'div');
        element.id = name;
        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.innerHTML = _.template(template, _.extend({}, options, {model:model}));
        }
        $parent.append(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});