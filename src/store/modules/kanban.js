// DragAndDrop

const state = {
  cards: [
    {
      itemID: "",
      properties: {
        pannelID: "",
        cardName: "",
        cardColor: ""
      }
    }
  ],
  pannels: [
    {
      pannelID: "",
      pannelName: "",
      cardIDs: []
    }
  ]
};

const getters = {
  // Cards
  getCardByID: state => cardID =>
    state.cards.find(card => card.itemID === cardId),

  getCards: state => state.cards
};

const actions = {
  // Cards
  addCard: ({ commit }, obj) => {
    commit("createCard", obj);
  },

  updateCard: ({ commit }, obj) => {
    commit("updateCard", obj);
  },

//   addPannel
};

const mutations = {
  // Cards
  createCard: (state, obj) => {
    state.cards.push(obj);
  },

  updateCard: (state, obj) => {
    var card = state.cards.find(card => card.itemID === obj.itemID);

    if (card !== undefined) {
      card.properties = obj.properties;
    } else {
      console.warn(
        `Trying to update inexistent card | details: ${JSON.stringify(obj)}`
      );
    }
  },

  deleteCard: (state, obj) => {
    var cardIndex = state.cards.findIndex(card => card.itemID === obj.itemID);

    if (cardIndex !== -1) {
      state.cards.splice(cardIndex, 1);
    } else {
      console.warn(
        `Trying to remove inexistent card | details: ${JSON.stringify(obj)}`
      );
    }
  },

  // Pannels
  createPannel: (state, obj) => {
    state.pannels.push(obj);
  },

  deletePannel: (state, obj) => {
    var pannelIndex = state.pannels.findIndex(
      pannel => pannel.itemID === obj.itemID
    );

    if (pannelIndex !== -1) {
      state.pannels.splice(pannelIndex, 1);
    } else {
      console.warn(
        `Trying to remove inexistent pannel | details: ${JSON.stringify(obj)}`
      );
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
