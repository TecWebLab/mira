"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/widgets/render'
], function ($, _, Render) {


    return {
        Icon: function($parent, name, $data, $env, options){
            var element = document.createElement(options.tag || 'span');
            var icon;
            var template = "<%= " + options.icon + '%>';
            try {
                var build = _.template(template, _.extend({}, options,
                        {$data:$data.attributes, $env:$env, $dataObj: $data})
                );
                icon = build;
            } catch (ex){
                icon = options.icon;
            }

            element.className = "glyphicon glyphicon-" +  icon;
            if(options.class){
                element.className += ' ' + options.class;
            }
            element.id = name;

            $parent.append(element);
            return {
                $children: $(element),
                html: element.outerHTML
            }
        }
    };
});