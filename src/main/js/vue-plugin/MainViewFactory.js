export default function MainViewFactory(Vue) {

    return class MainView {

        constructor({replace: replace = false, component: component, el: el}) {
            this.el = el;
            this.component = component;
            this.replace = replace;

            requireOption("el", el);
            requireOption("component", component);
        }

        iziContext(context) {
            this.context = context;
            this.vueInstance = this._createVueInstance();
        }

        iziDestroy() {
            this.vueInstance.$destroy(true);
        }

        _createVueInstance() {
            var context = this.context;

            return new Vue({

                el: this.el,
                replace: this.replace,
                template: "<view-component></view-component>",

                components: {
                    "view-component": this.component
                },

                events: {
                    "izi.wireMe"(child) {
                        context.wire(child);
                        return false;
                    }
                }
            });
        }
    }
}

function requireOption(name, value) {
    if (!value) {
        throw new Error(`Option ${name} is required`);
    }
}