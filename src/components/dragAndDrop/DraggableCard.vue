<template>
  <div class="card text-white bg-secondary">
    <div class="card-body">BlahBlah</div>
  </div>
</template>

<script>
export default {
    name: 'DraggableCard',
    data: function() {
        return {
            isDragged: false
        }
    },
    methods: {
        OnDragEnter(e) {
            this.isDragged = true;
            console.log('Drag start');
        },
        OnDragLeave(e) {
            this.isDragged = false;
            console.log('Drag end');
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
