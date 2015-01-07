Vue.config.debug = true;

new Vue({
    el: "#app",

    template: '' +
    '<izi-context>' +
    '    <some-model></some-model>' +
    '</izi-context>' +

    '<input type="text" v-model="model.foo">' +
    '<div>By mixin:</div>'+
    '<some-view-by-mixin></some-view-by-mixin>' +
    '<div>By element:</div>' +
    '<some-view-by-element></some-view-by-element>',

    components: {

        "some-model": {
            data: function () {
                return {
                    foo: "Foo Value!"
                }
            }
        },

        "some-view-by-mixin": {
            mixins: [Vue.iziAutowire],
            inject: {
                "model": "some-model"
            },
            template: '<h1>model.foo = "{{model.foo}}"</h1>',
            replace: true
        },

        "some-view-by-element": {
            inject: {
                "model": "some-model"
            },
            template: '' +
            '<izi-autowire></izi-autowire>' +
            '<h1>model.foo = "{{model.foo}}"</h1>',
            replace: true
        }
    }
});