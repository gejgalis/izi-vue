import _Vue from "vue";
import _izi from "../../../dist/izi-js-vue";

_Vue.use(_izi.VuePlugin);

export const Vue = _Vue;
export const izi = _izi;
export const vueDataInjector = _Vue.izi.vueDataInjector;
export const MainView = _Vue.izi.MainView;