"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/helper'
], function ($, _, Helper) {

    return {
        Types: function($parent, name, $data, $env, options){
            var element = document.createElement('div');

            var classes = ['label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];

            var $data = $data.attributes;

            _.each(eval(options.value), function(item, index){
                var label = document.createElement('span');
                label.className = 'label ' + classes[index % classes.length];
                label.innerHTML = item.text;
                element.appendChild(label);
            });

            element.className += ' ' + options.class;
            element.id = name;

            $parent.append(element);
            return {
                $children: $(element),
                html: element.outerHTML
            }
        }
    };
});