"use strict";

define([
    'jquery',
    'underscore',
    'backbone',
    'jsynth/base/model',
    'jsynth/base/collection'
], function ($, _, Backbone, ModelBase, CollectionBase) {

    var Model = Backbone.Model.extend({
        idAttribute: 'name',

        evaludate: function(model, request, device){
            try {
                return eval(this.get('validate')) == true;
            } catch (e){
                console.log("Error on rule" + this.get('name'), this, model, request, device);
                return false;
            }
        }
    });

    var Collection =  CollectionBase.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }
});