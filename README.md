izi IoC &amp; DI for Vue
========================

This izi (as in 'easy') library will help you to organize your JavaScript code around Vue components.
Using this tool you may easily introduce any of modern patterns like Flux, Redux or MV*.

Usage
-----

1. Download package:
    ```
    npm install izi-vue --save
    ```

    This package includes `izi-js`. You don't need to download separate `izi-js` package.

2. Install plugin in Vue and prepare your `common.js`:

    ```javascript
    import Vue from "vue";
    import izi from "izi-vue";
    
    const {MainView, iziInjectMixin} = izi.createVueHelpers(Vue);
    
    export {Vue, izi, MainView, iziInjectMixin}
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

        constructor() {
            this.model = izi.inject("FooModel");
        }
    
        changeFooToBar() {
            this.model.foo = "Bar";
        }
    };
    ```

5. Create `FooComponent.js`:

    ```javascript
    import {iziInjectMixin} from "./common";

    export default {
        // Mixin required for dependency injection
        mixins: [iziInjectMixin],

        // Dependency injection configuration
        iziInject: {
            // injects regular instance of dependency accessible via: this.controller...
            controller: "FooController",
        
            data: { // injects dependencies specially prepared for data binding
                model: "FooModel"
            }
        },
    
        template: `<div>
                        Hello injected {{model.foo}}!
                        
                        <button @click="controller.changeFooToBar()">Change Foo to Bar</button>
                   </div>`
    };
    ```

6. Create your IoC container `app.js`:

    ```javascript
    import {izi, MainView} from "./common";
    
    import FooModel from "./FooModel";
    import FooController from "./FooController";
    import FooComponent from "./FooComponent";

    izi.bakeBeans({
        FooModel,
        FooController,
        FooMainView: izi.instantiate(MainView).withProps({
            component: FooComponent,
            el: "#app",
            proxyMethods: true // all methods from FooComponent will be proxied via FooMainView bean
        })
    });
    ```

Unit Test
---------

Proposed approach lets you execute unit tests for code not related to DOM on NodeJS.
You may test faster all corner cases skipping heavy browser tests.

```javascript
import FooModel from "./FooModel";
import FooController from "./FooController";

describe("FooController", () => {

    var model, controller;
    
    beforeEach(() => {
        model = new FooModel();
        
        controller = new FooController();
        controller.model = model;          // set needed dependencies
    });
    
    it("should change foo to bar", () => {
        // given
        expect(model.foo).to.be("Foo");
        
        // when
        controller.changeFooToBar();
        
        // then
        expect(model.foo).to.be("Bar");
    });
});
```
