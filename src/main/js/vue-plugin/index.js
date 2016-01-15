import izi from "izi-js";
import MainView from "./MainViewFactory";
import vueDataInjector from "./vueDataInjectorFactory";
import wireMeMixin from "./wireMeMixin";

izi.VuePlugin = function (Vue) {

    Vue.mixin(wireMeMixin);

    Vue.izi = {
        vueDataInjector: vueDataInjector(Vue),
        MainView: MainView(Vue)
    };
};

export default izi;