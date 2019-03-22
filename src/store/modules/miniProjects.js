const state = {
    projects: [
        {
            projectId: 1,
            projectName: 'Todo list app',
            description: 'Simple todo app',
            features:[
                'Create todos',
                'Filter todos',
                'Remove all done todos'
            ],
            technologies: ['Vuex'],
            link: '/to-do'
        },
        {
            projectId: 2,
            projectName: 'Numbers api',
            description: 'Make use of numbers api to display a random number fact',
            features:[
                'Async api calls',
                'Regex filters'
            ],
            technologies: ['Axios', 'Async/Await', 'Promises'],
            link: '/random'
        },
        {
            projectId: 3,
            projectName: 'Kanban board',
            description: 'Make use of directives and drag&drop functionalities',
            features:[
                'Vue directives',
                'Drag and drop'
            ],
            technologies: ['Vuex', 'DragAndDrop'],
            link: '/drag-n-drop'
        }
    ]
}

const getters = {
    allProjects: (state) => {
        return state.projects;
    },

    projectRoutes: (state) => {
        var routes = [];
        state.projects.forEach(project => {
        })
        return routes;
    }
}

const mutations = {}
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}