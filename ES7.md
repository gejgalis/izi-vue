Planned ES7 improvements:

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

`view/TodoList.vue`

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
