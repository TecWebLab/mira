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

        BootstrapBase.Simple(widget.$children, name + '-tecweb-link', $context, {
          tag:'a', href:'http://tecweb.puc-rio.br'
        }, function(ret){

          BootstrapBase.Simple(ret.$children, name + '-tecweb', $context,{
            tag:'img', src:'imgs/rodape-tecweb.jpg'
          }, null);

        });

        BootstrapBase.Simple(widget.$children, name + '-puc-link', $context, {
          tag:'a', href:'http://www.puc-rio.br'
        }, function(ret){

          BootstrapBase.Simple(ret.$children, name + '-puc', $context,{
            tag:'img', src:'imgs/rodape-puc.jpg'
          }, function(ret){
            callback(ret);
          });

        });
      });
    }
  }
});