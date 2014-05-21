"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/widgets/render'
], function ($, _, Render) {

    return function($parent, name, model, options){

        var element = document.createElement(options.tag || 'div');
        element.id = name;
        var atrs = _.omit(options, 'tag', 'value', 'name', 'widget');

        _.each(atrs, function(value, atr){
            var template = "<%= " + value + '%>';
            try {
                var build = _.template(template, _.extend({}, options, {model: model.attributes}));
                element.setAttribute(atr,  build)
            } catch (ex){
                element.setAttribute(atr,  value)
            }
        });

        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.innerHTML = _.template(template, _.extend({}, options, {model:model.attributes}));
        }
        $parent.append(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});