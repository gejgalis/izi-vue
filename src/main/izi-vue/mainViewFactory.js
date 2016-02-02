export default function mainViewFactory(Vue) {

    return class MainView {

        constructor({
            el: el,
            component: component,
            replace: replace = false,
            proxyMethods: proxyMethods = true
            } = {}) {

            this.el = el;
            this.component = component;
            this.replace = replace;
            this.proxyMethods = proxyMethods;
        }

        iziContext(context) {
            requireOption("el", this.el);
            requireOption("component", this.component);

            this.context = context;
            this.vueInstance = this._createVueInstance();

            if (this.proxyMethods) {
                this._createProxyMethods();
            }
        }

        iziDestroy() {
            if (this.vueInstance) {
                this.vueInstance.$destroy(true);
                this.vueInstance = null;
            }
        }

        getVueInstance() {
            return this.vueInstance;
        }

        _createVueInstance() {
            const context = this.context;
            const el = this.el;

            if (typeof this.component === "function") {
                return new (this.component.extend({

                    el: function() {
                        return el;
                    },

                    replace: this.replace,

                    events: {
                        "izi.wireMe"(child) {
                            context.wire(child);
                            return false;
                        }
                    }
                }));
            } else {
                const componentConfig = {};
                const events = this.component.events || {};
                events["izi.wireMe"] = function (child) {
                    context.wire(child);
                    return false;
                };


                Object.assign(componentConfig, this.component, {
                    el: this.el,
                    replace: this.replace,
                    events: events
                });

                return new Vue(componentConfig);
            }
        }

        _createProxyMethods() {
            const vueInstance = this.getVueInstance();
            const methods = getMethodNames(vueInstance);

            methods.forEach(function (methodName) {
                this[methodName] = function () {
                    return vueInstance[methodName].apply(vueInstance, arguments);
                };
            }, this);
        }
    }
}

function requireOption(name, value) {
    if (!value) {
        throw new Error(`Option ${name} is required`);
    }
}

function getMethodNames(obj) {
    const methods = [];

    for (var methodName in obj) {
        const method = obj[methodName];

        if (typeof method === "function" && !/^_/.test(methodName) ) {
            methods.push(methodName);
        }
    }

    return methods;
}