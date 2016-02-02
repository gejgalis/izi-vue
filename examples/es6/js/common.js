import Vue from "vue";
import izi from "../../../src/main/izi-vue";

const {MainView, iziInjectMixin} = izi.createVueHelpers(Vue);

export {
    Vue,
    izi,
    MainView,
    iziInjectMixin
};