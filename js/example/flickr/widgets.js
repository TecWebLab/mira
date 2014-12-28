"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'mira/helper',
    'mira/widgets/bootstrap-base',
    'example/flickr/jquery.lightSlider.min',
    'example/flickr/jquery.collagePlus.min'
], function ($, _, Backbone, Helper, BootstrapBase, lightSlider, collage) {

    var flickr = {
        FlickrGallery : function($parent, name, $context, options, callback){
            var new_options = _.defaults(options, {
                    tag: 'ul'
                });
            BootstrapBase.Simple($parent, name, $context, new_options, function(ret){
                $context.$dataObj.on('complete', function(opt){
                    ret.$children.lightSlider({
                        gallery: true,
                        item: 1,
                        vertical: true,
                        verticalHeight: 295,
                        vThumbWidth: 75,
                        thumbItem: 5,
                        thumbMargin: 5,
                        slideMargin: 0
                    });
                });
                if(callback){
                    callback(ret);
                }
            });
        },
        FlickrGalleryItem : function($parent, name, $context, options, callback){
            var new_options = _.omit(_.defaults(options, {
                tag: 'li'
            }), 'img', 'link');
            BootstrapBase.Simple($parent, name, $context, new_options, function(ret){

                var clback = function(r) {
                    var img_options = _.defaults(options.img || {}, {
                        tag: 'img'
                    });
                    BootstrapBase.Simple(r.$children, name, $context, img_options, callback);
                };

                if(options.link){
                    var link_options = _.defaults(options.link || {}, {
                        tag: 'a'
                    });
                    BootstrapBase.Simple(ret.$children, name, $context, link_options, clback);
                } else {
                    clback(ret)
                }
            });
        },

        FlickrCollage: function($parent, name, $context, options, callback) {
            var options = _.defaults(options, { class:'' });
            options.class += 'Collage';

            BootstrapBase.Simple($parent, name, $context, options, function(ret){
                $context.$dataObj.on('complete', function(opt){
                    ret.$children.collagePlus();
                });
                callback(ret);
            });

        }


    };
    return flickr;
});