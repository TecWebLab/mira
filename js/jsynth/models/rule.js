"use strict";

define([
    'underscore',
    'jsynth/base/init'
], function (_, Base) {

    var Model = Base.Model.extend({
        idAttribute: 'name',

        evaluate: function(model, request, device){
            try {
                console.log(this, model, request, device);
                return eval(this.get('validate')) == true;
            } catch (e){
                console.log("Error on rule" + this.get('name'), this, model, request, device);
                return false;
            }
        }
    });

    var Collection =  Base.Collection.extend({
        model:Model
    });

    return {
        Model : Model,
        Collection: Collection
    }
});