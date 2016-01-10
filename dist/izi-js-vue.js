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

!function(module) {
    var frameworkName = "vue";

    module.registerFramework(frameworkName, {
        // No need to implement DataBinding, Behaviors and Queue
    });

    izi = izi.newInstance(frameworkName);

    izi.VuePlugin = function (Vue) {

        Vue.mixin({
            created: function () {
                for (var prop in this.$options) {
                    var injection = this.$options[prop];
                    if (injection && injection.isIziInjection) {
                        this[prop] = injection;
                    }
                }
                this.$dispatch("izi.wireMe", this);
            }
        });

        Vue.izi = {
            vueDataInjector: function (target, prop, dependency) {
                if (dependency && !dependency.__ob__) {
                    new Vue({
                        data: {
                            dependency: dependency
                        }
                    });
                }
                target.$set(prop, dependency);
            },

            MainView: function (options) {
                this.el = options.el;
                this.component = options.component;
                this.replace = options.replace || false;
            }
        };

        Vue.izi.MainView.prototype = {

            constructor: Vue.izi.MainView,

            iziContext: function (context) {
                this.context = context;
                this.vueInstance = this.createVueInstance();
            },

            iziDestroy: function () {
                this.vueInstance.$destroy(true);
            },

            createVueInstance: function () {
                var context = this.context;

                return new Vue({

                    el: this.el,
                    replace: this.replace,
                    template: "<view-component></view-component>",

                    components: {
                        "view-component": this.component
                    },

                    events: {
                        "izi.wireMe": function (child) {
                            context.wire(child);
                            return false;
                        }
                    }
                });
            }
        }
    };

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