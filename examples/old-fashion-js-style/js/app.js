var vueHelpers = izi.createVueHelpers(Vue);
var MainView = vueHelpers.MainView;
var iziInjectMixin = vueHelpers.iziInjectMixin;

var ChildComponent = Vue.extend({

    mixins: [iziInjectMixin],

    iziInject: {
        data: {
            model: "AppModel"
        }
    },

    template: "<div>Child: {{model.foo}}</div>"
});

var AppComponent = Vue.extend({

    mixins: [iziInjectMixin],

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

    AppMainView: izi.instantiate(MainView).withProps({
        component: AppComponent,
        el: "#app"
    })
});