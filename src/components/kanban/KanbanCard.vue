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

<script src="./KanbanCard.vue.js"></script>
<style lang="scss" scoped src="./KanbanCard.vue.scss"> </style>
