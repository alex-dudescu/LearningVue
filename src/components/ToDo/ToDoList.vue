<template>
    <div>

        <div>
            <input type="text" class="form-control" placeholder="Type what you want to do ..." @keyup.enter="createTodo" v-model="text">
        </div>

        <div class="mt-2 d-flex justify-content-center">
            <button @click="toggleFilterMode(1)" class="btn mr-2" :class="'btn-' + ((filterMode === 1) ? '' : 'outline-') + 'primary'">Active Todos</button>
            <button @click="toggleFilterMode(2)" class="btn mr-2" :class="'btn-' + ((filterMode === 2) ? '' : 'outline-') + 'primary'" >Done Todos</button>
            <button @click="clearDoneTodos" class="btn btn-outline-primary">Clear Done Todos</button>
        </div>

        <todo   
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
        ></todo>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Todo from './Todo'

export default {
    name: 'ToDoList',
    components: {
        Todo
    },
    data: function() {
        return {
            todoCache: [],
            text: '',
            filterMode: 0 // 1 - Active todos | 2 - Done todos
        }
    },
    computed: {
        ...mapGetters('todo', [
            'allTodos',
            'doneTodos',
            'activeTodos'
        ]),
        'filteredTodos': function() {
            return this.allTodos.filter(todo => this.applyFilter(todo));
        }
    },
    mounted: function() {
        this.todoCache = this.allTodos;
    },
    methods: {
        ...mapActions('todo', [
            'addTodo',
            'clearDoneTodos'
        ]),
        createTodo: function(e) {
            if(this.text !== "")
            {
                this.addTodo(this.text);
                this.text = "";
            }
        },
        toggleFilterMode: function(newFilterMode) {
            if(newFilterMode === this.filterMode)
            {
                this.filterMode = 0;
            }
            else
            {
                this.filterMode = newFilterMode;
            }
        },

        applyFilter: function(todo) {
            if(this.filterMode === 1) 
            {
                return !todo.done;
            }
            else if(this.filterMode == 2)
            {
                return todo.done;
            }
            else 
            {
                return true;
            }
        }
    },
}
</script>
