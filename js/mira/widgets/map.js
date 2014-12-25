"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return {
        Static: function($parent, name, $context, options) {

            var element = document.createElement('img');
            element.id = name;
            var attrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'class', 'width', 'height');
            var url = "http://maps.googleapis.com/maps/api/staticmap?sensor=false&";

            attrs['center'] = options['value'];

            var context = Helper.build_context($context, options);
            var attrs_compiled = Helper.build_object_with_context(attrs, context);

            attrs_compiled['size'] = attrs_compiled['size'] || '300x300';

            url += $.param(attrs_compiled);
            element.setAttribute('src', url);

            var element_attributes = _.pick(options, 'class', 'alt', 'title', 'width', 'height');
            Helper.build_attributes(element, element_attributes, context);

            $parent.append(element);
            return {
                $children: $(element),
                html: element.innerHTML
            }
        },

        Dynamic: function($parent, name, $context, options){
            var element = document.createElement('div');

            var attrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'class', 'alt', 'title', 'style', 'width', 'height');
            var context = Helper.build_context($context, options);
            var attrs_compiled = Helper.build_object_with_context(attrs, context);

            require(['async!http://maps.google.com/maps/api/js?sensor=false', 'gmap3'], function(){
                var element_attributes = _.pick(options, 'class', 'style', 'width', 'height');
                element_attributes['style'] = element_attributes['style'] || 'width:350px; height:350px;';
                    Helper.build_attributes(element, element_attributes, context);

                var $element = $(element);
                $element.gmap3({ map: attrs_compiled });
                $parent.append(element);
            });

            return {
                $children: $(element),
                html: element.innerHTML
            }
        }
    };
});