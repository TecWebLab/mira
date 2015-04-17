"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {


    return {
        GroupButton: function($parent, name, $context, options, callback){
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

            if(options.events) {
                Helper.build_events($button, options.events, $context);
            }

            if(callback){
                callback({
                    $children: $element,
                    $element: $element,
                    html: element.outerHTML
                })
            }
        },
        FormControl: function($parent, name, $context, options, callback){
            options.tag = 'div';
            options.form  = options.form || 'group';
            var new_options = _.omit(options, 'input');
            requirejs(['mira/widgets/bootstrap-base'] , function(BootstrapBase){
                BootstrapBase.Simple($parent, name, $context, new_options, function(ret){
                    options.input = _.defaults(options.input || {}, {
                            tag: 'input',
                            type: 'text',
                            form: 'control'
                        });
                    BootstrapBase.Simple(ret.$children, 'input-' + name, $context, options.input, callback)
                });
            });
        }
    };
});