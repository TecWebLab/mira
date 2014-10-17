"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/helper'
], function ($, _, Helper) {

    var map_type = {
        'style' : {
            tag: 'link',
            type: 'text/css',
            rel: 'stylesheet'
        },

        'icon' : {
            tag: 'link',
            type: 'image/ico',
            rel: 'icon'
        }
    };

    return function($head, name, $data, $env, options){
        var element = null;

        if(map_type[options.tag]){
            var opt = map_type[options.tag];
            element = document.createElement(opt.tag);
            element.type = opt.type;
            element.rel = opt.rel;
        } else {
            element = document.createElement('link');
            element.type = options.type;
            element.rel = options.rel;
        }
        element.id = name;
        element.className = 'navigate_remove'; // remove every navigate
        var attrs = _.omit(options, 'name', 'tag', 'type', 'rel', 'widget');

        _.each(attrs, function(value, atr){
            var template = "<%= " + value + '%>';
            try {
                var build = _.template(template, _.extend({}, options,
                    {$data:$data.attributes, $env:$env, $dataObj: $data})
                );
                element.setAttribute(atr,  build)
            } catch (ex){
                element.setAttribute(atr,  value)
            }
        });

        $head.append(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});