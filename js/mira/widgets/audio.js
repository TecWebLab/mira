"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper',
    'mira/widgets/bootstrap-base'
], function ($, _, Helper, BootstrapBase) {


    return {
        Player: function($parent, name, $context, options, callback){

            options.tag = 'audio';

            BootstrapBase.Simple($parent, name, $context, options, function(ret){

                ret.$element.prop('controls', 'controls');
                ret.$children.html(
                  '<source src="' + Helper.build_value(options.source, $context) + '" type="audio/mp3">'
                );

                if(callback){
                    callback(ret)
                }

            })
        }
    };
});