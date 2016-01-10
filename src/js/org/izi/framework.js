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
            dataInjector: function (target, prop, dependency) {
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