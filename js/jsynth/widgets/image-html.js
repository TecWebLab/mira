"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/widgets/render'
], function ($, _, Render) {

    return function($parent, name, $data, $env, options){

        var element = document.createElement('img');
        element.id = name;
        if(options.value) {
            var template = "<%= " + options.value + '%>';
            element.src = _.template(template, _.extend({}, options,
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