"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return function($parent, name, $context, options, callback){

        var element = document.createElement('img');
        element.id = name;
        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.src = _.template(template, _.extend({}, options, $context ));
        }
        $parent.append(element);
        if(callback){
            callback({
                $children: $(element),
                html: element.innerHTML
            })
        }
    };
});