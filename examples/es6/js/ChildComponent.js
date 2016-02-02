import {iziInjectMixin} from "./common";

export default {

    mixins: [iziInjectMixin],

    iziInject: {
        data: {
            model: "AppModel"
        }
    },

    template: "<div>Child: {{model.foo}}</div>"
};