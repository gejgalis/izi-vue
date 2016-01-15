Vue.config.debug = true;

Vue.use(izi.VuePlugin);

var vueDataInjector = Vue.izi.vueDataInjector;
var MainView = Vue.izi.MainView;

var ChildComponent = Vue.extend({

    model: izi.inject("AppModel").by(vueDataInjector),

    template: "<div>Child: {{model.foo}}</div>"
});

var AppComponent = Vue.extend({

    model: izi.inject("AppModel").by(vueDataInjector),

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