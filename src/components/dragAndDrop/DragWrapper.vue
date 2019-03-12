<template>
    <div :id="itemId" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
        <div :class="{'hide-in-drag' : isDragged}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import 'core-js/shim'
import 'regenerator-runtime/runtime'
import { mapActions } from 'vuex';

export default {
    name: 'DragWrapper',
    props: {
        category: {
            type: String,
            default: 'no-category'
        }
    },
    data: function() {
        return {
            itemId: '',
            isDragged: false
        }
    },
    computed: {
        ...mapActions('dragAndDrop', [
            'isElementDragged'
        ])
    },
    methods: {
        // Import methods from store
        ...mapActions('dragAndDrop', [
            'addToCategory',
            'toggleDrag'
        ]),

        initDraggable: function() {
            this.addToCategory({
                categoryName: this.category, 
                itemType: 'draggable'
            }).then((uniqueId) => {
                this.itemId = uniqueId;
                console.log(`%cCreated draggable with id ${this.itemId} in category ${this.category}`, "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;");
            })

        },

        onDragStart: async function(dragEvent) {
            if(!this.isDragged ) {
                this.isDragged = true;
                
                await this.toggleDrag()//.then(() => console.log('Done toggling!'));
                console.log('Dragged element start');
                dragEvent.dataTransfer.setData('elementId', this.itemId);
            }
        },

        onDragEnd: async function(dragEvent) {
            if(this.isDragged) {
                this.isDragged = false;
                await this.toggleDrag()//.then(() => console.log('Done toggling!'));

                console.log('Dragged element stop');
            }
        }
    },
    created: function() {
        this.initDraggable();
    }
}
</script>

