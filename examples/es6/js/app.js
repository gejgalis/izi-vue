import {izi, MainView} from "./common";

import AppModel from "./AppModel";
import AppComponent from "./AppComponent";

izi.bakeBeans({

    AppModel,

    AppMainView: izi.instantiate(MainView).withProps({
        component: AppComponent,
        el: "#app",
        replace: false
    })
});