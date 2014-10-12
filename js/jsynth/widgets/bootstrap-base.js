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

            var atrs = _.omit(options, 'tag', 'value', 'name', 'widget', 'icon');

            _.each(atrs, function(value, atr){
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