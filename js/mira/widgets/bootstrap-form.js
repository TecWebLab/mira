"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {


    return {
        GroupButton: function($parent, name, $context, options){
            var element = document.createElement('span');
            element.className = "input-group-btn";
            element.id = name;

            var button = document.createElement('button');
            button.className = "btn btn-lg " +  options.class;
            button.id = 'btn-' + name;

            var $element = $(element);
            $element.append(button);
            var $button = $(button);
            if(options.value) {
                var templateValue = "<%= " + options.value + '%>';
                $button.html(_.template(templateValue, _.extend({}, options,
                    $context)));
            }
            $parent.append(element);
            return {
                $children: $element,
                html: element.outerHTML
            }
        }
    };
});