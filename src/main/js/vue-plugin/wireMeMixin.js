export default function (izi, vueDataInjector) {
    return {
        created: function () {
            unwrap$optionsIziInject(this.$options, izi, vueDataInjector);
            moveInjectionsToVueInstance(this);
            this.$dispatch("izi.wireMe", this);
        }
    };
}

function unwrap$optionsIziInject($options, izi, vueDataInjector) {
    if (!$options.iziInject) {
        return;
    }

    for (var prop in $options.iziInject) {
        var beanId = $options.iziInject[prop];
        if (prop !== "data") {
            $options[prop] = izi.inject(beanId);
        } else {
            unwrapDataInjection($options, izi, vueDataInjector);
        }
    }
}

function unwrapDataInjection($options, izi, vueDataInjector) {
    var data = $options.iziInject.data;

    if (!data) {
        return;
    }

    for (var prop in data) {
        var beanId = data[prop];
        $options[prop] = izi.inject(beanId).by(vueDataInjector);
    }
}

function moveInjectionsToVueInstance(vueInstance) {
    for (var prop in vueInstance.$options) {
        var injection = vueInstance.$options[prop];
        if (injection && injection.isIziInjection) {
            vueInstance[prop] = injection;
        }
    }
}
