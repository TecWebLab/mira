"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper'
], function ($, _, Helper) {

    var template = '<div class="row">\
        <div class="col-md-12">\
        <div class="panel panel-default">\
        <div class="panel-body">\
        <div class="js_child">\
    </div>\
    </div>\
    </div>\
    </div>\
    </div>';

    return {
        Container: function($parent, name, $context, options, callback) {
            var element = document.createElement('div');
            element.id = name;
            element.innerHTML = template;
            element.className = options.class || 'container';
            $parent.append(element);
            if(callback){
                callback({
                    $children: $(element).find('.js_child'),
                    html: element.outerHTML
                });
            }
        },
        Detail : function($parent, name, $context, options, callback){
            var element = document.createElement('p');
            element.id = name;
            var strong = document.createElement('strong');
            strong.innerHTML = options.detail+ ': ';
            element.appendChild(strong);
            if(options.value) {
                var template = "<%= " + options.value + '%>';
                element.innerHTML = element.innerHTML + _.template(template, _.extend({}, options, $context));
            }
            $parent.append(element);
            if(callback){
                callback({
                    $children: $(element),
                    html: element.outerHTML
                })
            }
        },
        Image:function($parent, name, $context, options, callback){
            var element = document.createElement('div');
            element.id = name;
            element.className = options.class || 'col-xs-12 col-sm-3 text-center';
            var image = document.createElement('img');
            image.className = 'center-block img-circle img-responsive';
            if(options.value) {
                var template = "<%= " + options.value + '%>';
                var src = _.template(template, _.extend({}, options, $context));
                image.setAttribute('src', src);
            }
            element.appendChild(image);
            $parent.append(element);
            if(callback){
                callback({
                    $children: $(element),
                    html: element.outerHTML
                })
            }
        },
        MiniUser: function($parent, name, $context, options, callback){
            var image = document.createElement('img');
            image.className = 'center-block img-circle img-responsive';
            if(options.value) {
                var template = "<%= " + options.value + '%>';
                var src = _.template(template, _.extend({}, options, $context));
                image.setAttribute('src', src);
            }
            $parent.append(image);
            if(callback){
                callback({
                    $children: $(image),
                    html: image.outerHTML
                })
            }
        },
        Counts: function($parent, name, $context, options, callback){
            var item = document.createElement('li');
            item.className = options.class || 'badge';

            if(options.icon) {
                var icon = document.createElement('span');
                icon.className = 'glyphicon glyphicon-' + options.icon;
                item.appendChild(icon);
            }

            if(options.value) {
                var template = "<%= " + options.value + '%>';
                item.innerHTML = item.innerHTML + ' ' + _.template(template, _.extend({}, options, $context));
            }

            $parent.append(item);

            if(callback){
                callback({
                    $children: $(item),
                    html: item.outerHTML
                })
            }
        }
    };

});