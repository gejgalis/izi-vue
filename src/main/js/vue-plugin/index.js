import izi from "izi-js";
import MainView from "./MainViewFactory";
import vueDataInjector from "./vueDataInjectorFactory";
import wireMeMixin from "./wireMeMixin";

izi.VuePlugin = function (Vue, {vueDataInjector: dataInjector = vueDataInjector(Vue)} = {}) {

    Vue.mixin(wireMeMixin(izi, dataInjector));

    Vue.izi = {
        vueDataInjector: dataInjector,
        MainView: MainView(Vue)
    };
};

export default izi;