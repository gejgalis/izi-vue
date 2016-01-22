IoC &amp; DI for Vue
--------------------

This izi (as in 'easy') library will help you to organize your JavaScript code around Vue components.
Using this tool you may easly introduce any of modern patterns like Flux, Redux or MV*.

Usage
=======
1. Download package:
    ```
    npm install izi-js-vue --save
    ```

2. Install plugin in Vue and prepare your `common.js`:

    ```javascript
    import Vue from "vue";
    import izi from "izi-js-vue";
    
    Vue.use(izi.VuePlugin);
    
    const MainView = Vue.izi.MainView;
    
    export {Vue, izi, MainView}
    // you may put here other libraries you want to use like LoDash etc...
    ```

3. Create `FooModel.js`:

    ```javascript
    export default class FooModel {
        constructor() {
            this.foo = "Foo";
        }
    }
    ```
    
4. Create `FooController.js`:

    ```javascript
    import {izi} from "./common";
    
    export default class FooController {
    
        // Using ES7 properties...
        fooModel = izi.inject("FooModel");
        
        // ...otherwise:
        constructor() {
            this.fooModel = izi.inject("FooModel");
        }
    
        changeFooToBar() {
            this.fooModel.foo = "Bar";
        }
    };
    ```

5. Create `FooComponent.js`:

    ```javascript
    export default {
    
        iziInject: {
            // injects regular instance of dependency accessible via: this.dependency...
            controller: "FooController",
        
            data: { // inject dependencies specially prepared for data binding
                model: "FooModel"
            }
        },
    
        template: `<div>
                        Hello injected {{model.foo}}!
                        
                        <button @click="controller.changeFooToBar()">Change Foo to Bar</button>
                   </div>`
    };
    ```

6. Create your IoC container:

    ```javascript
    import {izi, MainView} from "./common";
    
    import FooModel from "./FooModel";
    import FooComponent from "./FooComponent";
    
    izi.bakeBeans({
    
        FooModel,
        
        FooController,
    
        FooMainView: new MainView({
            component: FooComponent,
            el: "#app",
            replace: false
        })
    });
    ```
