import {Vue, izi, vueDataInjector} from "./common";
import ChildComponent from "./ChildComponent";

export default Vue.extend({

    model: izi.inject("AppModel").by(vueDataInjector),

    template: '<div><input v-model="model.foo"> <child-component></child-component> </div>',

    components: {
        "child-component": ChildComponent
    }
});