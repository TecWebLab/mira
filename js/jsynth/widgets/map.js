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
            var attrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'class', 'alt', 'title', 'wight', 'height');
            var url = "http://maps.googleapis.com/maps/api/staticmap?";

            attrs['center'] = options['value'];

            var context = Helper.build_context($data, $env, options);
            var attrs_compiled = Helper.build_object_with_context(attrs, context);

            url += $.param(attrs_compiled);
            element.setAttribute('src', url);

            var element_attributes = _.pick(options, 'class', 'alt', 'title', 'wight', 'height');
            Helper.build_attributes(element, element_attributes, context);

            $parent.append(element);
            return {
                $children: $(element),
                html: element.innerHTML
            }
        },

        Dynamic: function($parent, name, $data, $env, options){
            var $head = $('head');

            if($head.find('.map_lib').length == 0){
                var js = document.createElement('script')


            }

        }
    };
});