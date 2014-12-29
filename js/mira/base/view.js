"use strict";

define([
    'jquery',
    'underscore',
    'mira/base/init'
], function ($, _, Base) {

    var ViewData = Base.View.extend({
        __name__: 'View.Data',

        initialize: function(options){
            if(options.$el){
                this.setElement(options.$el);
            }

            if(this.model){
                this.setModel();
            }

            var plus = _.pick(options, 'concrete', 'widget', '$env', '$bind', '$parent', 'collectionView');
            _.extend(this, plus);
            this.subviews = [];
        },

        setModel: function(model){
            if(model) {
                this.model = model;
            }
            this.listenTo(this.model, 'change', this.render, this);
            this.listenTo(this.model, 'destroy', this.remove, this);
        },

        render: function(){
            var esse = this;
            var old_$el = this.$el;
            var parent = $('<div/>');
            if(old_$el) {
                old_$el.hide();
            }
            this.widget.buildWidget(parent, this.concrete, this.model, this.$env, function(options){
                esse.setElement(options.$element || options.$children);
                esse.widget.buildChildren(esse.$el, esse.concrete, esse.model, esse.$env);
                if(old_$el.parent().length){
                    old_$el.after(parent.children());
                    old_$el.remove();
                } else {
                    esse.$parent.append(parent.children());
                }
            });

            if(this.collectionView && this in this.collectionView.subviews){
                this.collectionView.subviews.push(this);
            }

            return this;
        }

    });

    var ViewCollection = Base.View.extend({
        __name__: 'View.Collection',

        initialize: function(options){

            this.setElement(options.$el);

            var plus = _.pick(options, 'concrete', 'widget', 'itemWidget', '$env', '$bind');
            _.extend(this, plus);

            this.subviews = [];
        },

        render: function(){
            this.$el.html('');
            this.collection.each(function(m, i){
                if(this.model) {
                    m.$parente_data = this.model;
                    m.set('$parent_data', this.model.attributes);
                }

                var subview = new ViewData({
                    model: m,
                    $parent: this.$el,
                    widget: this.itemWidget,
                    concrete: this.concrete,
                    $env: this.$env,
                    collectionView: this
                });
                subview.render();

                if(i + 1 == this.collection.length){
                    this.model.trigger('complete', {
                        $parent: this.$el,
                        $data: this.model,
                        $env: this.$end ,
                        $bind: this.$bind,
                        $children: this.$el,
                        view: this
                    });
                }
            }, this);
        }

    });

    return {
        Data: ViewData,
        Collection: ViewCollection
    }

});