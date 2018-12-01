/*
  Array of dummy players where each player:
  "player_id": {
    "hand": [Card]
    "field": {
      "action_cards": [Card],
      "property_cards": [[Card]],
      "bank": [Card]
    }
  }
*/
const players = {
  player_1: {
    hand: [],
    field: {
      action_cards: [],
      property_cards: [],
      bank_cards: []
    }
  },
  player_2: {
    hand: [],
    field: {
      action_cards: [],
      property_cards: [],
      bank_cards: []
    }
  },
  player_3: {
    field: {
      action_cards: [],
      property_cards: [],
      bank_cards: []
    }
  },
  player_4: {
    hand: [],
    field: {
      action_cards: [],
      property_cards: [],
      bank_cards: []
    }
  },
  player_5: {
    hand: [],
    field: {
      action_cards: [],
      property_cards: [],
      bank_cards: []
    }
  }
};

export default players;
