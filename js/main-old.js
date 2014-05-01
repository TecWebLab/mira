"use strict";

define(function(require){

    var Ticket = function(teste){

        this.id_ticket = 0;
        this.title = "";
        this.assign = "";
    };


    var Bunda = function(bunda){
        this.bunda = bunda;
    };

    var nools = require('nools');
    var rules = require('text!rules.nools');
    var flow = nools.compile(rules, {name: "message"});
    //var Message = flow.getDefined("message");
    var session = flow.getSession();
    session.assert(new Ticket("goodbye"));
    session.assert(new Bunda("hello"));
    session.assert(new Ticket("hello world"));

//now fire the rules
    session.match(function(err){
        if(err){
            console.error(err);
        }else{
            console.log("done");
        }
    })

});
