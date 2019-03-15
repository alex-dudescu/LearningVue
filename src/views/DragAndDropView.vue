<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="card border-primary">
          <div class="card-header">Col 1</div>
          <div class="card-body">
            <drag-wrapper>
              <div class="card text-white bg-primary">
                <div class="card-body">BlahBlah</div>
              </div>
            </drag-wrapper>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-primary">
          <div class="card-header">Col 2</div>
          <div class="card-body">
            <container-wrapper>
            </container-wrapper>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card border-primary">
          <div class="card-header">Col 3</div>
          <div class="card-body">
            <drag-wrapper>
              <div class="card text-white bg-secondary">
                <div class="card-body">BlahBlah</div>
              </div>
            </drag-wrapper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DraggableCard from 'Components/dragAndDrop/DraggableCard'
import DragWrapper from 'Components/dragAndDrop/DragWrapper'
import ContainerWrapper from 'Components/dragAndDrop/ContainerWrapper'

export default {
  name: "DragAndDropView",
  components: {
      DraggableCard,
      DragWrapper,
      ContainerWrapper
  }
};
</script>
