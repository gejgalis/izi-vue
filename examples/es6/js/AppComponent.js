import ChildComponent from "./ChildComponent";

export default {

    iziInject: {
        data: {
            model: "AppModel"
        }
    },

    template: `<div><input v-model="model.foo"><child-component></child-component></div>`,

    components: {
        ChildComponent
    }
};