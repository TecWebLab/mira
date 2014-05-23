"use strict";

define([
    'jsynth/base/init'
], function(Base) {

    var Model = Base.Model.extend({
        parse: function(data){
            return data;
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