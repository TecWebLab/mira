"use strict";

define([
    'jquery',
    'underscore',
    'jsynth/widgets/render'
], function ($, _, Render) {

    var template = '<div class="row"> \
        <div class="col-lg-12"> \
        <p>Copyright &copy; TecWeb 2014 </p> \
    </div> \
    </div>';

    return function($parent, name, $data, $env, options){
        var hr = document.createElement('hr');
        var element = document.createElement('footer');
        element.id = name;
        element.innerHTML = template;
        $parent.append(hr);
        $parent.append(element);
        return {
            $children: $parent,
            html: element.outerHTML
        }
    };
});