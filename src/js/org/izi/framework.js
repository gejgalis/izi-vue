/**
 * @requires ioc/index.js
 */
!function(module) {
    var frameworkName = "vue";

    module.registerFramework(frameworkName, {
        // No need to implement DataBinding, Behaviors and Queue
    });

    izi = izi.newInstance(frameworkName);

}(izi.module);