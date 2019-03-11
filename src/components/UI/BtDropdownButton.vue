<template>
    <div class="btn-group" role="group" v-if="hasValues">
        <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{selectedItem}}
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a class="dropdown-item" v-for="(item, index) in values" :key="index" @click="selectOption(index)">{{item}}</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BtDropdownButton',
    props: {
        values: {
            required: false,
            default: () => []
        },
    },
    data: function() {
        return {
            selected: 0
        }
    },
    computed: {
        'hasValues' : function() {
            return this.values.length > 0;
        },
        'selectedItem' : function() {
            return this.values[this.selected];
        }
    },
    methods: {
        selectOption(newOption) {
            if(this.selected != newOption)
            {
                this.selected = newOption;
                this.$emit('valueChanged', newOption);
            }
        }
    }
}
</script>

