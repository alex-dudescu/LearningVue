const state = {
    categories: [],
    lastCatgoryId: 0,
    isElementInDrag: false
}

const getters = {
    getCategoryByName: (state, categoryName) => {
        return state.categories.find(category => categoryName === category.categoryName);
    },

    isElementDragged: (state) => {
        return state.isElementInDrag;
    }

    
}

const actions = {
    // Adds an item to a category
    addToCategory: async ({commit, dispatch, state}, obj) => {
        var category = state.categories.find(category => obj.categoryName === category.categoryName);

        // Create category if inexistent
        if(category === undefined) {
            commit('createCategory', obj.categoryName);
        }

        // Assign id
        await dispatch('requireUniqueID', obj).then((res) => {
            obj.itemId = res;
            commit('insertInCategory', obj);
        })

        return obj.itemId;
    },

    requireUniqueID: ({state}, obj) => {
        var category = state.categories.find(category => {
            return category.categoryName === obj.categoryName
        })

        if(obj.itemType === 'draggable') {
            return `draggable-${category.categoryId}-${++category.draggables.lastId}`
        }

        if(obj.itemType === 'container') {
            return `container-${category.categoryId}-${++category.containers.lastId}`
        }

        return undefined;
    },

    toggleDrag: ({commit}) => {
        commit('changeDragState');
    },

    moveDraggable: ({commit}, obj) =>
    {
        commit('addDraggableToCategory', obj);
    }
}

const mutations = {
    // Category
    createCategory: (state, categoryName) => {
        state.categories.push({
            categoryId: ++state.lastCatgoryId,
            categoryName: categoryName,
            draggables: {
                items: [],
                lastId: 0
            },
            containers: {
                items: [],
                lastId: 0
            }
        })
    },

    insertInCategory: (state, obj) => {
        var category = state.categories.find(category => {
            return category.categoryName === obj.categoryName
        })

        if(category === undefined)
            return undefined;

        if(obj.itemType === 'draggable') {
            category.draggables.items.push({
                itemId: obj.itemId
            });

            return category.draggables.items[category.draggables.items.length - 1].itemId;
        }
        if(obj.itemType === 'container') {
            category.containers.items.push({
                itemId: obj.itemId,
                draggables: []
            });

            return category.containers.items[category.containers.items.length - 1].itemId;
        }

        return undefined;
    },

    changeDragState: (state) => {
        state.isElementInDrag = !state.isElementInDrag;
    },

    addDraggableToCategory: (state, obj) => {
        var category = state.categories.find(category => obj.categoryName == category.categoryName);
        var container = category.containers.items.find(container => {
            console.log(obj.containerId);
            console.log(container.itemId);
            return obj.containerId === container.itemId
        });

        console.log(container);
        container.draggables.push({'itemId': obj.draggableId});
    } 
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}