<template>
    <div :id="itemID" draggable="true" @dragstart="onDragStart" @dragend="onDragEnd">
        <div :class="{'hide-in-drag' : isDragged}">
            <slot></slot>
        </div>
    </div>
</template>

<script src="./DragWrapper.vue.js"></script>

