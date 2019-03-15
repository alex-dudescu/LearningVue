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