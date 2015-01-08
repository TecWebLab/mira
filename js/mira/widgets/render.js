"use strict";

define([
    'mira/helper',
    'mira/widgets/simple-html',
    'mira/widgets/map',
    'mira/widgets/input',
    'mira/widgets/head',
    'mira/widgets/meta',
    'mira/widgets/title',
    'mira/widgets/image-html',
    'mira/widgets/bootstrap-base',
    'mira/widgets/bootstrap-modal',
    'mira/widgets/bootstrap-carousel',
    'mira/widgets/bootstrap-image-box',
    'mira/widgets/bootstrap-navigation',
    'mira/widgets/bootstrap-footer',
    'mira/widgets/bootstrap-form',
    'mira/widgets/profile',
    'mira/widgets/freebase'
    ],function (Helper, SimpleHtml, Map, Input, Head, Meta, Title, ImageHtml,
                BootstrapBase, BootstrapModal, BootstrapCarousel, BootstrapImageBox, BootstrapNavigation, BootstrapFooter,
                BootstrapForm, Profile, Freebase
    ) {

    var pathToWidget = function(name){
        var root = 'mira/widgets/';
        var file = name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).substring(1);
        return root + file;
    };
    var default_widget = 'SimpleHtml';
    var widgets = {
        SimpleHtml:SimpleHtml,
        MapStatic:Map.Static,
        MapDynamic:Map.Dynamic,
        Input:Input,
        Head: Head,
        Meta: Meta,
        Title: Title,
        ImageHtml:ImageHtml,
        BootstrapSimple: BootstrapBase.Simple,
        BootstrapFormControl: BootstrapForm.FormControl,
        BootstrapModalDialog: BootstrapModal.Dialog,
        BootstrapModalHeader: BootstrapModal.Header,
        BootstrapModalBody: BootstrapModal.Body,
        BootstrapModalFooter: BootstrapModal.Footer,
        BootstrapPanelBody: BootstrapBase.PanelBody,
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
        setDefault: function (widget) {
            default_widget = widget;
        },
        call: function(map, $parent, $data, $env, $bind, callback){
            var widget_name = map.get('widget') || default_widget;
            var widget = widgets[widget_name];
            if(widget) {
                var $context = {
                    $data: $data.attributes || $data,
                    $env: $env,
                    $bind: $bind,
                    $dataObj: $data,
                    $map: map
                };

                return widgets[widget_name].call(
                    map,
                    $parent,
                    map.get('name'),
                    $context,
                    _.clone(map.attributes),
                    callback
                );
            } else {
                console.error('Widget Concreto not Founded', widget_name, map);
            }
        },
        register: function(custom_widgets){
            _.extend(widgets, custom_widgets);
        }
    };
});