import {izi, MainView} from "./common";

import AppModel from "./AppModel";
import AppComponent from "./AppComponent";

izi.bakeBeans({

    AppModel: new AppModel(),

    AppMainView: new MainView({
        component: AppComponent,
        el: "#app",
        replace: false
    })
});