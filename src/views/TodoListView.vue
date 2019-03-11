<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <to-do-list></to-do-list>
        </div>
    </div>
</template>

<script>
import ToDoList from 'Components/ToDo/ToDoList'

export default {
    name: 'ToDoListView',
    components: {
        ToDoList
    }
}
</script>


