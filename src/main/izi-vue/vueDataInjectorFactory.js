export default function vueDataInjectorFactory(Vue) {

    return function vueDataInjector(target, prop, dependency) {
        if (dependency && !dependency.__ob__) {
            new Vue({
                data: {
                    dependency: dependency
                }
            });
        }
        Vue.set(target, prop, dependency)
    }
}
