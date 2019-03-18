import { mapActions, mapGetters } from "vuex";

export default {
  name: "ToDo",
  props: {
    todo: undefined
  },
  methods: {
    ...mapActions("todo", ["toggleTodo", "deleteTodo"])
  }
};
