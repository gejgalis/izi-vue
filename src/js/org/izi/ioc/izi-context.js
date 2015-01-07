Vue.component("izi-context", {

    template: "<content></content>",

    ready: function () {
        var context;
        var children = this.$el.children;
        var beans = {};

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child && child.__vue__) {
                beans[child.tagName.toLowerCase()] = child.__vue__;
            }
        }

        console.log("[izi] baking beans: ", beans);
        this.context = izi.bakeBeans(beans);

        this.$parent.$on("izi:requestWire", this._onRequestWire);

        if (this.$parent && this.$parent.$options && this.$parent.$options.inject) {
            this._onRequestWire(this.$parent);
        }
    },

    methods: {

        getBean: function () {
            return this.context.getBean.apply(this.context, arguments);
        },

        wire: function () {
            return this.context.wire.apply(this.context, arguments);
        },

        _onRequestWire: function (target) {
            for (var key in target.$options.inject) {
                target.$add(key, izi.inject(target.$options.inject[key]));
            }
            console.log("[izi] injecting:", target.$options.inject, "to:", target);
            this.wire(target);
            return false;
        }
    }

});