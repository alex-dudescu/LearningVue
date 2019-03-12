import Vue from 'vue'
import VueRouter from 'vue-router';

import ToDoListView from 'Views/ToDoListView'
import HomeView from 'Views/HomeView'
import DragAndDropView from 'Views/DragAndDropView'
import RandomNumberFact from 'Components/numbersApi/RandomNumberFact'

const routes = [
    { path: '*',                redirect: '/home'},
    { name: 'Home',             path: '/home',          component: HomeView,  },
    { name: 'To do',            path: '/to-do',         component: ToDoListView },
    { name: 'Random API',       path: '/random',        component: RandomNumberFact},
    { name: 'Drag and drop',    path: '/drag-n-drop',   component: DragAndDropView }
];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: routes
})

