function wire(target) {
    if (target.$options.inject) {
        for (var key in target.$options.inject) {
            target.$add(key, izi.inject(target.$options.inject[key]));
        }
        target.$dispatch("izi:requestWire", target);
    } else {
        console.log("`inject` configuration not found on:", this);
    }
}

Vue.iziAutowire = {
    created: function () {
        this.$once('hook:ready', function () {
            wire(this);
        });
    }
};

Vue.component("izi-autowire", {
    ready: function () {
        wire(this.$parent);
    }
});