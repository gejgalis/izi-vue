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
        this.context = context = izi.bakeBeans(beans);

        this.$parent.$on("izi:requestWire", function (target) {
            console.log("[izi] injecting:", target.$options.inject, "to:", target);
            context.wire(target);
            return false;
        });
    },

    methods: {

        getBean: function () {
            return this.context.getBean.apply(this.context, arguments);
        },

        wire: function () {
            return this.context.wire.apply(this.context, arguments);
        }
    }

});