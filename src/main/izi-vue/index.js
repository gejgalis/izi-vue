import izi from "../../../node_modules/izi-js/dist/izi-js-debug";

import mainViewFactory from "./mainViewFactory";
import vueDataInjectorFactory from "./vueDataInjectorFactory";
import iziInjectMixinFactory from "./iziInjectMixinFactory";

izi.iziInjectMixinFactory = iziInjectMixinFactory;

izi.createVueHelpers = function (Vue, vueDataInjector = vueDataInjectorFactory(Vue)) {
    return {
        MainView: mainViewFactory(Vue),
        iziInjectMixin: iziInjectMixinFactory(vueDataInjector)
    }
};

export default izi;