"use strict";

define([
    'jsynth/base/init'
], function (Base) {
    var Model = Base.Model.extend({

    });

    var Collection =  Base.Collection.extend({
        model:Model
    });


    return {
        Model : Model,
        Collection: Collection
    }

});