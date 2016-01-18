Vue.config.debug = true;

Vue.use(izi.VuePlugin);

var MainView = Vue.izi.MainView;

var ChildComponent = Vue.extend({

    iziInject: {
        data: {
            model: "AppModel"
        }
    },

    template: "<div>Child: {{model.foo}}</div>"
});

var AppComponent = Vue.extend({

    iziInject: {
        data: {
            model: "AppModel"
        }
    },

    template: '<div><input v-model="model.foo"> <child-component></child-component> </div>',

    components: {
        "child-component": ChildComponent
    }
});

var model = {foo: "Foo"};

var ctx = izi.bakeBeans({

    AppModel: model,

    AppMainView: new MainView({
        component: AppComponent,
        el: "#app",
        replace: false
    })
});