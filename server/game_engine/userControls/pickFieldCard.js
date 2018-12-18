const userActions = require('./../userActions');

const retrieveFromPropertyPile = (player, pileName, id) => {
  let card = null;
  let index = null;
  let size1 = player.field[pileName].length;
  for (let i = 0; i < size1; i++) {
    let size2 = player.field[pileName][i].length;
    for (let j = 0; j < size2; j++) {
      if (player.field[pileName][i][j].id === id) {
        card = player.field[pileName][i][j];
        index = i;
        break;
      }
    }
    if (index) {
      break;
    }
  }
  if (null !== card) {
    return {
      card,
      source: {
        pileName,
        pile: player.field[pileName][index]
      }
    };
  }
  return false;
};

const retrieveFromNonPropertyPile = (player, pileName, id) => {
  let card = null;
  for (let i = 0; i < player.field[pileName].length; i++) {
    if (player.field[pileName][i].id === id) {
      card = player.field[pileName][i];
      break;
    }
  }
  if (null !== card) {
    return {
      card,
      source: {
        pileName,
        pile: player.field[pileName]
      }
    };
  }
  return false;
};

const retrieve_from_pile = {
  property_cards: retrieveFromPropertyPile,
  bank_cards: retrieveFromNonPropertyPile,
  building_cards: retrieveFromNonPropertyPile
};

pickCard = (Game, player, pileNames, pileName, callback) =>
  userActions.pickCardId(Game, {
    player,
    callback: (error, id) => {
      if (error) {
        callback(error);
      } else {
        let card_exist = retrieve_from_pile[pileName](player, pileName, id);
        if (card_exist) {
          callback(null, card_exist.card, card_exist.source);
        } else {
          pickFieldCard(Game, player, pileNames, callback);
        }
      }
    }
  });

const pickFieldCard = (Game, player, pileNames, callback) => {
  userActions.pickOption(Game, {
    player,
    options: pileNames,
    callback: (error, pileName) => {
      if (error) {
        callback(error);
      } else if (player.field[pileName].length) {
        pickCard(Game, player, pileNames, pileName, callback);
      } else {
        callback('pile is empty');
      }
    }
  });
};

module.exports = pickFieldCard;
