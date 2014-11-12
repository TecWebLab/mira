"use strict";

define([
    'mira/widgets/simple-html',
    'mira/widgets/map',
    'mira/widgets/input',
    'mira/widgets/head',
    'mira/widgets/meta',
    'mira/widgets/title',
    'mira/widgets/image-html',
    'mira/widgets/bootstrap-base',
    'mira/widgets/bootstrap-carousel',
    'mira/widgets/bootstrap-image-box',
    'mira/widgets/bootstrap-navigation',
    'mira/widgets/bootstrap-footer',
    'mira/widgets/bootstrap-form',
    'mira/widgets/profile',
    'mira/widgets/freebase'
    ],function (SimpleHtml, Map, Input, Head, Meta, Title, ImageHtml,
                BootstrapBase, BootstrapCarousel, BootstrapImageBox, BootstrapNavigation, BootstrapFooter,
                BootstrapForm, Profile, Freebase
    ) {

    var pathToWidget = function(name){
        var root = 'mira/widgets/';
        var file = name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).substring(1);
        return root + file;
    };
    var widget = {
        SimpleHtml:SimpleHtml,
        MapStatic:Map.Static,
        MapDynamic:Map.Dynamic,
        Input:Input,
        Head: Head,
        Meta: Meta,
        Title: Title,
        ImageHtml:ImageHtml,
        BootstrapSimple: BootstrapBase.Simple,
        BootstrapCarousel: BootstrapCarousel.Carousel,
        BootstrapCarouselItem: BootstrapCarousel.Item,
        BootstrapIcon: BootstrapBase.Icon,
        BootstrapImageBox: BootstrapImageBox,
        BootstrapFooter: BootstrapFooter,
        ProfileContainer: Profile.Container,
        ProfileImage: Profile.Image,
        ProfileDetail: Profile.Detail,
        ProfileCount: Profile.Counts,
        BootstrapNavigation: BootstrapNavigation.Main,
        BootstrapNavigationList: BootstrapNavigation.List,
        BootstrapNavigationListItem: BootstrapNavigation.ListItem,
        BootstrapFormGroupButton: BootstrapForm.GroupButton,
        FreebaseTypes: Freebase.Types
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
        }
    };
});