<template>
<div style="hover:background-color: #aaaaaa; height: 100px" @drop="onDrop" @dragover="allowDrop"> 

</div>
</template>

<script>
import 'core-js/shim'
import 'regenerator-runtime/runtime'
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ConatinerWrapper',
    props: {
        category: {
            type: String,
            default: 'no-category'
        }
    },
    computed: {
        ...mapGetters('dragAndDrop', [
            'get'
        ])
    },
    methods: {
        ...mapActions('dragAndDrop', [
            'addToCategory',
            'moveDraggable'
        ]),

        initContainer: function() {
            this.addToCategory({
                categoryName: this.category,
                itemType: 'container'
            }).then((uniqueId) => {
                this.itemId = uniqueId;
                console.log(`%cCreated container with id ${this.itemId} in category ${this.category}`, "background-color: #3399ff; color: white; padding-left: 3px; padding-right: 3px;");
            })
        },

        onDrop: async function(dropEvent) {
            console.log('Sth dropped');
            var draggableId = dropEvent.dataTransfer.getData('elementId');
            console.log(draggableId);

            this.moveDraggable({
                categoryName: this.category,
                containerId: this.itemId,
                draggableId: draggableId
            })
        },

        allowDrop: async function(dropEvent) {
            dropEvent.preventDefault()
        }
    },
    created: function() {
        this.initContainer();
    }
}
</script>

