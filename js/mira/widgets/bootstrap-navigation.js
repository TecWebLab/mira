"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    var template = '<div class="container"> \
    <div class="navbar-header"> \
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse"> \
            <span class="sr-only">Toggle navigation</span> \
            <span class="icon-bar"></span> \
            <span class="icon-bar"></span> \
            <span class="icon-bar"></span> \
        </button> \
        <a class="navbar-brand js_title" href="#"></a> \
    </div> \
    <div class="collapse navbar-collapse navbar-ex1-collapse js_child"> \
    </div> \
</div>';

    return {
        Main: function($parent, name, $data, $env, options){
            var element = document.createElement('nav');
            element.className = "navbar navbar-inverse navbar-fixed-top";
            element.id = name;
            element.setAttribute("role","navigation");
            element.innerHTML = template;

            var $element = $(element);
            var value = $element.find('.js_title');
            if(options.value) {
                var templateValue = "<%= " + options.value + '%>';
                value.html(_.template(templateValue, _.extend({}, options,
                    {$data:$data.attributes, $env:$env, $dataObj: $data})));
            }
            $parent.append(element);
            return {
                $children: $element.find('.js_child'),
                html: element.outerHTML
            }
        },
        List: function($parent, name, $data, $env, options){
            var element = document.createElement('ul');
            element.className = 'nav navbar-nav';
            element.id = name;
            $parent.append(element);
            return {
                $children: $(element),
                html: element.innerHTML
            }
        },
        ListItem: function($parent, name, $data, $env, options){
            var element = document.createElement('li');
            if(options.href || options.value) {
                var link = document.createElement('a');
                link.setAttribute('href', '#');
                if (options.href) {
                    var template = "<%= " + options.href + '%>';
                    link.setAttribute('href', _.template(template, _.extend({}, options,
                        {$data:$data.attributes, $env:$env, $dataObj: $data}))
                    );
                }
                if (options.value) {
                    var template = "<%= " + options.value + '%>';
                    link.innerHTML = _.template(template, _.extend({}, options,
                        {$data:$data.attributes, $env:$env, $dataObj: $data}
                    ));
                }
                element.appendChild(link);
            }
            $parent.append(element);
            return {
                $children: $(element),
                html: element.innerHTML
            }
        }
    };
});