"use strict";

define([
    'jsynth/widgets/simple-html',
    'jsynth/widgets/image-html',
    'jsynth/widgets/bootstrap-image-box'
    ],function (SimpleHtml, ImageHtml, BootstrapImageBox) {

    var pathToWidget = function(name){
        var root = 'jsynth/widgets/';
        var file = name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).substring(1);
        return root + file;
    };
    var widget = {
        SimpleHtml:SimpleHtml,
        ImageHtml:ImageHtml,
        BootstrapImageBox: BootstrapImageBox
    };

    return  {
        load : function(name, callback){
            if(!widget[name]) {
                require([pathToWidget(name)], function (Widget) {
                    widget[name] = Widget;
                    callback(Widget);
                });
            } else {
                callback(widget[name]);
            }
        },
        get: function(name){
            return widget[name];
        },
        build_string: function(template, model, request, device){
            return
        }
    };
});