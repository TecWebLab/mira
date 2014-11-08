"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    return {
        Static: function($parent, name, $data, $env, options) {

            var element = document.createElement('img');
            element.id = name;
            var attrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'class', 'width', 'height');
            var url = "http://maps.googleapis.com/maps/api/staticmap?sensor=false&";

            attrs['center'] = options['value'];

            var context = Helper.build_context($data, $env, options);
            var attrs_compiled = Helper.build_object_with_context(attrs, context);

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

        Dynamic: function($parent, name, $data, $env, options){
            var element = document.createElement('div');
            var $element = $(element);

            var attrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'class', 'alt', 'title', 'width', 'height');
            var context = Helper.build_context($data, $env, options);
            var attrs_compiled = Helper.build_object_with_context(attrs, context);

            require('async!http://maps.google.com/maps/api/js?sensor=false', 'gmaps3', function(){

                $("#test").gmap3({ map: attrs_compiled });

                var element_attributes = _.pick(options, 'class', 'width', 'height');
                Helper.build_attributes(element, element_attributes, context);

                $parent.append(element);
            });

            return {
                $children: $(element),
                html: element.innerHTML
            }
        }
    };
});