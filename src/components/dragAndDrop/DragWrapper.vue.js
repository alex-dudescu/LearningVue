import 'core-js/shim'
import 'regenerator-runtime/runtime'
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'DragWrapper',
    props: {
        category: {
            type: String,
            default: 'default'
        }
    },
    data: function() {
        return {
            itemID: '',
            isDragged: false
        }
    },
    computed: {
        ...mapActions('dragAndDrop', [
            'isElementDragged'
        ]),

        ...mapGetters('dnd', [
            'getGlobalDragState'
        ])
    },
    methods: {
        // Import methods from store
        ...mapActions('dragAndDrop', [
            'addToCategory',
            'toggleDrag'
        ]),

        ...mapActions('dnd', [
            'addDraggable',
            'moveDraggable',
            'addCategory',
            'toggleGlobalDragState'
        ]),

        // Create cateory if necessary; Create and add draggable
        initDraggable: async function() {
            if(this.category !== 'default') {
                await this.addCategory({categoryName: this.category});
            }

            this.addDraggable({
                categoryName: this.category
            }).then((uniqueID) => {
                this.itemID = uniqueID;
                console.log(`%cCreated draggable with id ${this.itemID} in category ${this.category}`, "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;");
            })
        },

        onDragStart: async function(dragEvent) {

            if(!this.getGlobalDragState) {
                this.isDragged = true;
                await this.toggleGlobalDragState();
                dragEvent.dataTransfer.setData('elementId', this.itemID);
            }
        },

        onDragEnd: async function(dragEvent) {
            if(this.getGlobalDragState) {
                this.isDragged = false;
                await this.toggleGlobalDragState();
            }
        }
    },
    created: function() {
        this.initDraggable();
    }
}