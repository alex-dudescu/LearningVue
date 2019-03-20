import { mapActions, mapGetters } from "vuex";

export default {
  name: "ToDoItem",
  props: {
    todo: undefined
  },
  methods: {
    ...mapActions("todo", ["toggleTodo", "deleteTodo"])
  }
};
