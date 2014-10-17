"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/helper'
], function ($, _, Helper) {

    return function($parent, name, $data, $env, options, ignored_options){
        var element = document.createElement(options.tag || 'div');
        element.id = name;

        var atrs = _.omit(options, 'tag', 'value', 'name', 'widget', ignored_options);
        var context = Helper.build_context($data, $env, options);
        Helper.build_attributes(element, atrs, context);

        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.innerHTML = _.template(template, _.extend({}, options,
                {$data:$data.attributes, $env:$env, $dataObj: $data}
            ));
        }
        $parent.append(element);
        return {
            $children: $(element),
            html: element.innerHTML
        }
    };
});