<template>
    <div class="card text-white bg-primary mb-3"  @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @blur="onBlured">
        <div class="card-body">
            <div v-if="!isInEdit" class="d-inline">
                {{text}}
            </div>
            <div v-if="isInEdit" >
                <input class="form-control" type="text" v-model="text" @keydown.enter="onBlured">
            </div>
            <button type="button" v-if="isMouseOver && !isInEdit" class="btn btn-secondary btn-sm d-inline float-right" @click="onFocused">Edit</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'KanbanCard',
    data: function() {
        return {
            isInEdit: false,
            isMouseOver: false,
            text: 'Kanban card'
        }
    },
    methods: {
        onFocused() {
            this.isInEdit = true;
        },
        onBlured() {
            this.isInEdit = false;
        },
        onMouseEnter() {
            this.isMouseOver = true;
        },
        onMouseLeave() {
            this.isMouseOver = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.card-body {
    min-height: 5em;
}
</style>
