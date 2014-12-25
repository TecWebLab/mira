"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    var values = function(string_value, $data, $env, $bind, $dataObj){
        return eval(string_value);
    };

    return {
        Types: function($parent, name, $context, options){
            var element = document.createElement('div');

            var classes = ['label-success', 'label-info', 'label-warning', 'label-danger', 'label-default'];

            _.each(values(options.value, $context.$data, $context.$env, $context.$bind, $context.$dataObj),
                function(item, index){
                    var label = document.createElement('span');
                    label.className = 'label ' + classes[index % classes.length];
                    label.innerHTML = item.text;
                    element.appendChild(label);
                }
            );

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