import {Vue, izi, vueDataInjector} from "./common";

export default Vue.extend({

    model: izi.inject("AppModel").by(vueDataInjector),

    template: "<div>Child: {{model.foo}}</div>"
});