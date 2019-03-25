// DragAndDrop v2

/**
 * globalDragState: Check if user is currently dragging something across the screen.
 * categories: A list of all categories. Contains a default category that no-category items are added to
 * 
 */

const state = {
    globalDragState: false,
    lastCategoryID: 1,
    categories: [
        {
            itemID: 1,
            categoryName: 'default', 
            lastContainerID: 1,
            lastDraggableID: 0,
        } 
    ],
    draggables: [],
    containers: [
        {
            itemID: 'default',
            categoryID: 1,
            draggables: [],
            isDefault: true
        }
    ]
}

const getters = {

    // ##### Category #####
    getCategoryByName: (state) => (categoryName) => state.categories.find(
        category => category.categoryName === categoryName),

    getCategoryByID: (state) => (categoryID) => {

        return state.categories.find(
        category => category.itemID === categoryID)},

    getCategoriesDefaultContainer: (state) => (categoryID) => state.containers.find(
        container => container.categoryID === categoryID && container.isDefault),

    // ##### Container #####
    getContainerByID: (state) => (containerID) => state.containers.find(
        container => container.itemID === containerID),

    getContainersDraggableList: (state) => (containerID) => state.containers.find(
        container => container.itemID === containerID
    ).draggables,

    getContainerAvailabilty: (state) => (containerID) => state.containers.find(
        container => container.itemID === containerID
    ) !== undefined, 

    // ##### Draggable #####
    getDraggableByID: (state) => (draggableID) => state.draggables.find(
        draggable => draggable.itemID === draggableID),

    // ##### Others #####
    getGlobalDragState: (state) => state.globalDragState,
}

const actions = {
    
    // ##### Category #####
    addCategory: async ({commit, dispatch, getters}, obj) => {
        
        // Check if already existent 
        var category = getters['getCategoryByName'](obj.categoryName);
        if(category) return;

        // Create category

        var newCategory = {
            itemID: -1,
            categoryName: obj.categoryName,
            lastContainerID: 0,
            lastDraggableID: 0,
        }

        await dispatch('requireCategoryID').then((uniqueID) => {
            newCategory.itemID = uniqueID;
        }) 
        
        
        await commit('createCategory', newCategory)

        // Create a 'default container'
        await dispatch('addContainer', obj).then(async (containerID) => {
            await commit('markContainerAsDefault', containerID)
        })
    },

    // ##### Containers #####
    addContainer: async({commit, dispatch, getters}, obj) => {

        var newContainer = {
            itemID: '',
            categoryID: -1,
            draggables: []
        }

        // Assign category id
        if(obj.categoryName !== undefined) {
            
            var category = getters['getCategoryByName'](obj.categoryName);
            if(category !== undefined) {
                newContainer.categoryID = category.itemID;
            }
            else {
                console.warn(`Couldn't find specified category in container ${obj}\nObject was not registered`);
                return undefined;
            }
        }
        
        // Assign item id
        await dispatch('requireContainerID', newContainer.categoryID).then((uniqueID) => {
            newContainer.itemID = uniqueID;
        })

        commit('createContainer', newContainer);

        return newContainer.itemID;
    },

    // ##### Draggable #####
    addDraggable: async({commit, dispatch, getters}, obj) => {
        
        var newDraggable = {
            itemID: '',
            categoryID: -1,
            currentContainerID: '',
            model : obj.model
        }

        // Assign category id
        if(obj.categoryName !== undefined) {
        
            var category = getters['getCategoryByName'](obj.categoryName);
            
            if(category !== undefined) {
                newDraggable.categoryID = category.itemID;
            }
            else {
                console.warn(`Couldn't find specified category in draggable ${JSON.stringify(obj)}\nObject was not registered`);
                return undefined;
            }
        }
        else {
            console.warn(`Couldn't find specified category in draggable ${JSON.stringify(obj)}\nObject was not registered`);
            return undefined;
        }

        // Asign item id
        await dispatch('requireDraggableID', newDraggable.categoryID).then((uniqueID) => {
            newDraggable.itemID = uniqueID;
        })

        // Assign container id to specified or to category's default container
        if(obj.containerID !== undefined) {
            newDraggable.currentContainerID = obj.containerID;
        }
        else {
            var defaultContainer = getters['getCategoriesDefaultContainer'](newDraggable.categoryID);
            if(defaultContainer !== undefined) {
                newDraggable.currentContainerID = defaultContainer.itemID;
            }
            else {
                console.warn(`Couldn't find default container for category ${JSON.stringify(newDraggable.categoryID)}\nObject was not registered`);
                return undefined;
            }
        }

        commit('createDraggable', newDraggable);

        commit('registerDraggable', {
            categoryID: newDraggable.categoryID,
            draggableID: newDraggable.itemID,
            containerID: newDraggable.currentContainerID
        })

        return newDraggable.itemID;
    },

    /**
     * Obj:
     * {
     *  draggableID,
     *  containerID
     * }
     */
    moveDraggable: async ({commit, getters}, obj) => {
        
        var draggable = getters['getDraggableByID'](obj.draggableID);
        var oldContainer = getters['getContainerByID'](draggable.currentContainerID);

        // Check category compatibilty
        await commit('unregisterDraggable', {
            draggableID: obj.draggableID,
            containerID: oldContainer.itemID
        })

        await commit('registerDraggable', obj)

        draggable.currentContainerID = obj.containerID;
    },

    updateDraggableModel: ({commit}, obj) => {
        commit('updateDraggableModel', obj);
    },

    // ##### Others #####
    requireCategoryID: ({state}) => {
        return ++state.lastCategoryID
    },

    requireDraggableID: ({getters}, categoryID) => {
        var category = getters['getCategoryByID'](categoryID);

        if(category !== undefined) {
            category.lastDraggableID = category.lastDraggableID + 1
            return `draggable-${categoryID}-${category.lastDraggableID}`
        }

        console.warn(`Trying to add draggble to undefined category with id: ${categoryID}`);
        return undefined;
    },

    requireContainerID: ({getters}, categoryID) => {
        var category = getters['getCategoryByID'](categoryID)

        if(category !== undefined) {
            category.lastContainerID = category.lastContainerID + 1;
            return `container-${categoryID}-${category.lastContainerID}`
        }

        console.warn(`Trying to add draggble to undefined category with id: ${categoryID}`);
        return undefined;
    },

    toggleGlobalDragState: async ({state, commit}) => {
        await commit('updateGlobalDragState', !state.globalDragState);
    }
}

const mutations = {

    // ##### Category #####
    createCategory: (state, obj) => {
        state.categories.push(obj);
    },

    deleteCategory: (state, obj) => {
        var categoryIndex = state.categories.findIndex(category => category.itemID === obj.itemID);

        if(categoryIndex !== -1) {
            state.categories.splice(categoryIndex, 1);
        }
        else {
            console.warn(`Trying to remove inexistent category. Category details: ${JSON.stringify(obj)}`)
        }
    },

    // ##### Draggables #####
    createDraggable: (state, obj) => {
        state.draggables.push(obj);
    },

    deleteDraggable: (state, obj) => {
        var draggableIndex = state.draggables.findIndex(draggable => draggable.itemID === obj.itemID);

        if(draggableIndex !== -1) {
            state.categories.splice(draggableIndex, 1);
        }
        else {
            console.warn(`Trying to remove inexistent draggable. Category details: ${JSON.stringify(obj)}`)
        }
    },

    updateDraggableModel: (state, obj) => {
    },

    // ##### Containers #####
    createContainer: (state, obj) => {
        state.containers.push(obj);
    },

    deleteContainer: (state, obj) => {
        var containerIndex = state.containers.findIndex(container => container.itemID === obj.itemID);

        if(containerIndex !== -1) {
            state.categories.splice(containerIndex, 1);
        }
        else {
            console.warn(`Trying to remove inexistent container. Container details: ${JSON.stringify(obj)}`)
        }
    },

    /**
     * obj
     * {
     *  draggableID,
     *  containerID,
     * }
     */
    registerDraggable: (state, obj) => {
        var isContainerDefault = obj.containerID === undefined;
        var container = state.containers.find(
            container => {
                if(isContainerDefault)
                    return container.categoryID === obj.categoryID && container.isDefault;
                return container.itemID === obj.containerID
            });
        
        if(container !== undefined) {
            container.draggables.push(obj.draggableID);
        }
        else {
            console.warn(`Cannot register draggable. Operation details: ${JSON.stringify(obj)}`)
        }
    },

    /**
     * obj
     * {
     *  draggableID,
     *  containerID,
     * }
     */
    unregisterDraggable: (state, obj) => {
        var container = state.containers.find(
            container => container.itemID === obj.containerID);

        if(container !== undefined) {

            var draggableIndex = container.draggables.indexOf(obj.draggableID);
            
            if(draggableIndex !== -1)
            {
                container.draggables.splice(draggableIndex, 1);
            }
            else {
                console.warn(`Cannot unregister draggable. Draggable not found. Operation details: ${JSON.stringify(obj)}`)
            }
        }
        else {
            console.warn(`Cannot unregister draggable. Container not found. Operation details: ${JSON.stringify(obj)}`)
        }
    },

    markContainerAsDefault: (state, containerID) => {
        var container = state.containers.find(container => container.itemID === containerID);

        if(container !== undefined) {
            container.isDefault = true;
        }
        else {
            console.warn(`Trying to mark default inexistent container. Container details: ${JSON.stringify(containerID)}`)
        }
    },

    // ##### Others #####
    updateGlobalDragState: (state, newState) => {
        state.globalDragState = newState
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}