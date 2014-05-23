"use strict";

define([
    'underscore',
    'jsynth/base/init'
], function (_, Base) {

    var Model = Base.Model.extend({
        idAttribute: 'name',

        evaluate: function(data, request, device, dataObj){
            try {
                return eval(this.get('validate')) == true;
            } catch (e){
                console.log("Error on rule" + this.get('name'), this, data, request, device);
                return false;
            }
        }
    });

    var Collection =  Base.Collection.extend({
        model: Model
    });

    return {
        Model: Model,
        Collection: Collection
    }
});