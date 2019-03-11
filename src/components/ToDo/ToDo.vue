<template>
    <transition name="fade">
    <div class="card mb-2 mt-2">
        <!-- <transition name="toggle" v-if="!todo.done"> -->
        <div class="card-body" :class="{'text-muted done-todo' : todo.done}">
            <h5 class="d-inline" :class="{}">
                {{ todo.text }}
            </h5>
            <!-- x Button -->
            <button class="d-inline btn btn-outline-danger float-right" @click="deleteTodo(todo)"> 
                <i class="fa fa-times"></i> 
            </button>

            <!-- v Button  -->
            <button class="d-inline btn float-right mr-2" :class="'btn-' + ((!todo.done) ? 'outline-' : '') + 'success' " @click="toggleTodo(todo)"> 
                <i class="fa fa-check"></i> 
            </button>
        </div>
        <!-- </transition> -->
    </div>
    </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ToDo',
    props: {
        todo: undefined
    },
    methods: {
        ...mapActions('todo', [
            'toggleTodo',
            'deleteTodo'
        ])
    }
}
</script>

<style lang="scss">
.done-todo  {
    background-color: #fafafa;

    h5 {
        text-decoration: line-through;
    }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

// .toggle-enter, .toggle-leave-active  {
//     transition: background-color .5s ease;
//     background-color: #ffffff !important;
// }

// .toggle-enter, .toggle-leave-to
// {
//     background-color: #000000 !important;
// }
</style>
