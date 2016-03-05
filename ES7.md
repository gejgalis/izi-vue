Planned ES7 improvements:

`store/todosStoreFactory.js`

    import Vuex from 'vuex'

    export default function () {
      return new Vuex({
          state: {
            todos: []
          }
      })
    }


`behaviors/LoadTodos.js`

    import {inject, init} from 'izi-vue'
    import {autobind} from 'core-decorators'
    import {TodosService} from './TodosService'
    import {LOAD_TODOS} from './actions'
    
    export default class LoadTodos {

       @inject('todosStore') // inject by bean id
       store

       @inject(TodosService) // inject by class reference
       service

       @init                 // call this method when dependencies are ready to use
       load() {
         this.service.get().then(this.onResult)
       }

       @autobind
       onResult(response) { // response is let say array of {id:number, label:string, active:boolean}
         this.store.dispatch(LOAD_TODOS, response)
       }
    }

`view/TodoListView.vue`

    <script>
      import {injectStore} from 'izi-vue'

      export defaut {
        @injectStore('todoStore')
        store: null
      }
    </script>

    <template>
        <div>.....</div>
    </template>

`todosListContext.js`

    import {izi, singleton, MainView} from './common'
    import todosStoreFactory from './store/todosStoreFactory'
    import TodoListView from './view/TodoListView.vue'
    import LoadTodos from './behaviors/LoadTodos'
    import TodosService from './services/TodosService'

    export default function ($targetEl) {
      return izi.bakeBeans({

        todosStore: todosStoreFactory,     // factory method - this bean can't be injected by reference
                                           // it must be injected by string 'todosStore'
        TodosService,

        TodoListView: singleton(MainView).withProps({
          el: $targetEl,
          component: TodoListView
        }),

        LoadTodos
      })
    }


`app.js`

    import todosListContext from './todos-list/todosListContext'

    todosListContext(document.getElementById('todos-list'))
