const state = {
    todos: [
    ],
    lastId: 1
}

// Getters
const getters = {
    
    allTodos: (state) => {
        return state.todos;
    },

    doneTodos: (state) => {
        return state.todos.filter(todo => todo.done)
    },

    activeTodos: (state) => {
        return state.todos.filter(todo => !todo.done)
    },

    todoCount: (state) => {
        return state.todos.length
    }
}

// Actions
const actions = {
    addTodo: ({commit}, text) => {
        commit('createTodo', {
            text,
            done: false
        })
    },

    toggleTodo: ({commit}, todo) => {
        commit('changeTodoState', todo);
    },

    deleteTodo: ({commit}, todo) => {
        commit('removeTodo', todo);
    },

    clearDoneTodos: ({commit, state}) => {
        state.todos.filter(item => item.done)
        .forEach(todo => {
            commit('removeTodo', todo);
        });
    }
}

// Mutations 
const mutations = {
    createTodo: (state, todo) => {
        todo.id = state.lastId++;
        state.todos.unshift(todo);
    },

    changeTodoState: (state, todo) => {
        todo.done = !todo.done;
    },

    removeTodo: (state, todo) => {
        // console.log(todo);
        state.todos.splice(state.todos.indexOf(todo), 1);
    }
}

export default {
    namespaced: true, 
    state,
    getters,
    actions,
    mutations
}