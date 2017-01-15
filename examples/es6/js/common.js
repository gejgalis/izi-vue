import Vue from "vue/dist/vue";
import izi from "../../../src/main/izi-vue";

const {MainView, iziInjectMixin} = izi.createVueHelpers(Vue);

export {
    Vue,
    izi,
    MainView,
    iziInjectMixin
};