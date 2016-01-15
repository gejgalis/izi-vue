const wireMeMixin = {

    created: function () {
        for (var prop in this.$options) {
            var injection = this.$options[prop];
            if (injection && injection.isIziInjection) {
                this[prop] = injection;
            }
        }
        this.$dispatch("izi.wireMe", this);
    }
};

export default wireMeMixin;