"use strict";

define([
  'jquery',
  'underscore',
  'mira/helper',
  'mira/widgets/bootstrap-base'
], function ($, _, Helper, BootstrapBase) {

  return {
    Rodape: function($parent, name, $context, options, callback) {

      BootstrapBase.Simple($parent, name, $context, {
        tag:'div', text:'center', class:'container'
      }, function(widget){

        BootstrapBase.Simple(widget.$children, name + '-tecweb', $context,{
          tag:'img', src:'imgs/rodape-tecweb.jpg'
        }, null);

        BootstrapBase.Simple(widget.$children, name + '-puc', $context,{
          tag:'img', src:'imgs/rodape-puc.jpg'
        }, function(ret){
          callback(ret);
        });

      });

    }
  }
});