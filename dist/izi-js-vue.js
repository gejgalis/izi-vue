/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 izi-js contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global) {
    function umdFactory(Vue, izi) {

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
function wire(target) {
    if (target.$options.inject) {
        target.$dispatch("izi:requestWire", target);
    } else {
        console.log("`inject` configuration not found on:", this);
    }
}

Vue.iziAutowire = {
    created: function () {
        this.$once('hook:ready', function () {
            wire(this);
        });
    }
};

Vue.component("izi-autowire", {
    ready: function () {
        wire(this.$parent);
    }
});
/**
 * @requires izi-context.js
 * @requires izi-autowire.js
 */

/**
 * @requires ioc/index.js
 */
!function(module) {
    var frameworkName = "vue";

    module.registerFramework(frameworkName, {
        // No need to implement DataBinding, Behaviors and Queue
    });

    izi = izi.newInstance(frameworkName);

}(izi.module);
        return izi;
    }

    if (typeof define === "function" && typeof define.amd === "object" && define.amd.vendor !== "dojotoolkit.org") {
        define(["vue", "izi-js"], umdFactory);
    } else if (typeof exports === 'object') {
        module.exports = umdFactory(require("vue"), require("izi-js"));
    } else {
        global.izi = umdFactory(global.Vue, global.izi);
    }
})(this);