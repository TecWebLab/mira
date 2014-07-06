"use strict";

define([
    'jsynth/widgets/simple-html',
    'jsynth/widgets/image-html',
    'jsynth/widgets/bootstrap-image-box',
    'jsynth/widgets/bootstrap-navigation',
    'jsynth/widgets/bootstrap-footer',
    'jsynth/widgets/profile'
    ],function (SimpleHtml, ImageHtml,
                BootstrapImageBox, BootstrapNavigation, BootstrapFooter,
                Profile
    ) {

    var pathToWidget = function(name){
        var root = 'jsynth/widgets/';
        var file = name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).substring(1);
        return root + file;
    };
    var widget = {
        SimpleHtml:SimpleHtml,
        ImageHtml:ImageHtml,
        BootstrapImageBox: BootstrapImageBox,
        BootstrapFooter: BootstrapFooter,
        ProfileContainer: Profile.Container,
        ProfileImage: Profile.Image,
        ProfileDetail: Profile.Detail,
        ProfileCount: Profile.Counts,
        BootstrapNavigation: BootstrapNavigation.Main,
        BootstrapNavigationList: BootstrapNavigation.List,
        BootstrapNavigationListItem: BootstrapNavigation.ListItem
    };

    return  {
        load : function(name, callback){
            if(!widget[name]) {
                requirejs([pathToWidget(name)], function (Widget) {
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