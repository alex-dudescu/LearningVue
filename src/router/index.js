import Vue from 'vue'
import VueRouter from 'vue-router';

import ToDoListView from 'Views/ToDoListView'
import HomeView from 'Views/HomeView'
import RandomNumberFact from 'Components/numbersApi/RandomNumberFact'

const routes = [
    { path: '*',            redirect: '/home'},
    { name: 'Home',         path: '/home',              component: HomeView,  },
    { name: 'To do',        path: '/to-do',             component: ToDoListView },
    { name: 'Random API',   path: '/random',            component: RandomNumberFact}
];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: routes
})

