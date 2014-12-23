"use strict";

define([
    'jquery',
    'underscore',
    'mira/helper',
    'mira/widgets/bootstrap-base'
], function ($, _, Helper, BootstrapBase) {

    var template_modal = '\
    <div class="modal <%= options.effect %>" id="<%= name %>">\
    <div class="modal-dialog">\
        <div class="modal-content">\
            <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>\
            </div>\
            <div class="modal-body">\
            </div>\
            <div class="modal-footer">\
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                <button type="button" class="btn btn-primary">Save changes</button>\
            </div>\
        </div>\
    </div>\
    </div>\
    ';
    var template_dialog = '\
    <div class="modal <%= options.effect %>" id="<%= name %>">\
    <div class="modal-dialog">\
        <div class="modal-content">\
            <div class="modal-header">\
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>\
            </div>\
            <div class="modal-body">\
            </div>\
            <div class="modal-footer">\
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                <button type="button" class="btn btn-primary">Save changes</button>\
            </div>\
        </div>\
    </div>\
    </div>\
    ';

    var add_class = function(actual, to_append){
        if(!actual){
            return to_append
        }
        if(to_append) {
            return [actual, to_append].join(' ');
        }
        return actual;
    };

    return {

        Dialog: function($parent, name, $data, $env, options) {

            options.class = add_class(options.class, 'modal');
            options.class = add_class(options.class, options.effect);

            var modal = BootstrapBase.Simple($parent, name, $data, $env, options);

            options.dialog = _.defaults(options.dialog || {}, {
               class: 'modal-dialog'
            });

            var dialog = BootstrapBase.Simple(modal.$children, name + '-dialog', $data, $env, options.dialog);

            options.content = _.defaults(options.content || {}, {
                class: 'modal-content'
            });

            var content = BootstrapBase.Simple(dialog.$children, name + '-content', $data, $env, options.content);

            return content;
        },

        Header: function($parent, name, $data, $env, options) {
            options.class = add_class(options.class, 'modal-header');
            var value = options.value;
            var inner = '';
            var context = Helper.build_context($data, $env, options);
            var header = BootstrapBase.Simple($parent, name, $data, $env, options);
            if (options.class != false){
                inner += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>';
            }
            if(value){
                inner += '<h4 class="modal-title">' + Helper.build_value(value, context) + '</h4>';
            }
            header.$children.html(inner);

            return header;
        },

        Body: function($parent, name, $data, $env, options) {
            options.class = add_class(options.class, 'modal-body');
            return BootstrapBase.Simple($parent, name, $data, $env, options);
        },

        Footer: function($parent, name, $data, $env, options) {
            options.class = add_class(options.class, 'modal-footer');
            return BootstrapBase.Simple($parent, name, $data, $env, options);
        }

    };

});