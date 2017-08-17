export default function mainViewFactory(Vue) {

    return class MainView {

        constructor({el, component, proxyMethods = true} = {}) {
            this.el = el;
            this.component = component;
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
                let VueComponent = this.component.extend({
                    methods: {
                        __iziWire (child) {
                            context.wire(child)
                        },

                        __iziDetach (bean) {
                            context.detachBean(bean)
                        }
                    }
                });
                return new VueComponent({el});
            } else {
                const componentConfig = {};

                Object.assign(componentConfig, this.component, {
                    el: this.el,
                    methods: Object.assign(componentConfig || {}, {
                        __iziWire (child) {
                            context.wire(child)
                        }
                    })
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

        if (typeof method === "function" && !/^_/.test(methodName)) {
            methods.push(methodName);
        }
    }

    return methods;
}