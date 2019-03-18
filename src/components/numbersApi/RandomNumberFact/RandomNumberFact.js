import "core-js/shim";
import "regenerator-runtime/runtime";

import BtCard from "UI/BtCard";
import BtDropdownButton from "UI/BtDropdownButton";
import { RepositoryFactory } from "API/RepositoryFactory";

const randomRepository = RepositoryFactory.get("numbers");

const optionsMap = {
  0: "",
  1: "math",
  2: "date"
};

export default {
  name: "RandomNumberFact",
  components: {
    BtCard,
    BtDropdownButton
  },
  data: function() {
    return {
      result: [],
      isLoading: false,
      fact: {
        number: undefined,
        text: undefined
      },
      inputText: "",
      selectedOption: 0
    };
  },
  methods: {
    async getRandomFact() {
      var randomFact = {};

      this.isLoading = true;
      await randomRepository
        .getRandomFact()
        .then(result => {
          randomFact.number = result.data.number;
          randomFact.text = result.data.text;
        })
        .catch(err => {
          console.log(err);
        });
      this.isLoading = false;

      this.result = [randomFact];
    },

    async getFactByCategory(searchTerm, category) {
      var categoryFact = {};

      await randomRepository
        .getNumberFactByCategory(searchTerm, category)
        .then(result => {
          categoryFact.number = result.data.number;
          categoryFact.text = result.data.text;
        })
        .catch(err => {
          console.log(err);
        });

      return categoryFact;
    },

    async createSearch() {
      this.isLoading = true;

      this.result = [];
      var searchTerms = [];

      // Set regex to igonre '/' for Date searches
      var separators = this.selectedOption === 2 ? /[ ,.;]/g : /[ ,.;/]/g;
      var forbidden = this.selectedOption === 2 ? /[ a-zA-Z]/g : /[ /a-zA-Z]/g;

      this.inputText.split(separators).forEach(term => {
        term = term.replace(forbidden, "");

        if (term != "" && term.split("/").length - 1 <= 1)
          searchTerms.push(term);
      });

      for (var i = 0; i < searchTerms.length; i++) {
        this.result.push(
          await this.getFactByCategory(
            searchTerms[i],
            optionsMap[this.selectedOption]
          )
        );
      }

      this.isLoading = false;
    },

    onOptionChanged(newOption) {
      this.selectedOption = newOption;
    }
  }
};
