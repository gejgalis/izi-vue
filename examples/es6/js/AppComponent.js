import {iziInjectMixin} from "./common";
import ChildComponent from "./ChildComponent";

export default {

    mixins: [iziInjectMixin],

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