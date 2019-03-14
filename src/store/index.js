import Vue from 'vue'
import Vuex from 'vuex'

import todo from './modules/todo'
import miniProjects from './modules/miniProjects' 
import dragAndDrop from './modules/dragAndDrop'
import dragAndDrop2 from './modules/dragAndDrop.2';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        todo,
        miniProjects,
        dragAndDrop,
        'dnd' : dragAndDrop2
    }
})