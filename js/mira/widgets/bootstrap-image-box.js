"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return function($parent, name, $context, options){

        var element = document.createElement('div');
        element.className = options.class || "col-sm-4 col-lg-4 col-md-4";
        element.id = name;

        var $element = $(element);
        var thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        $element.append(thumbnail);

        var $thumbnail = $(thumbnail);

        if(options.value) {
            var template = "<%= " + options.value + '%>';
            $thumbnail.innerHTML = _.template(template, _.extend({}, options,
                $context));
        }
        $parent.append(element);
        return {
            $children: $thumbnail,
            html: element.outerHTML
        }
    };
});