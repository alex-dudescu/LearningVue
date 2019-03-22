import Vue from 'vue'
import Vuex from 'vuex'

import todo         from './modules/todo'
import miniProjects from './modules/miniProjects' 
import dragAndDrop  from './modules/dragAndDrop';
import kanban       from './modules/kanban'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        todo,
        miniProjects,
        dragAndDrop,
        kanban
    }
})