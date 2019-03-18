import BtCard from "UI/BtCard";
import BtButton from "UI/BtButton";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    BtCard,
    BtButton
  },
  data: function() {
    return {
      projects: []
    };
  },
  computed: {
    ...mapGetters("miniProjects", ["allProjects"])
  },
  methods: {
    getTechnologies(project) {
      var technologies = "";
      project.technologies.forEach(technology => {
        technologies += "<li>" + technology + "</li>";
      });
      return technologies;
    },

    getLinks(project) {
      return Array({ path: project.link, text: "Go to Project" });
    }
  },
  created: function() {
    this.projects = this.allProjects;
  }
};
