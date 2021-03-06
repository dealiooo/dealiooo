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

const retrieveFromPile = {
  propertyCards: retrieveFromPropertyPile,
  bankCards: retrieveFromNonPropertyPile,
  buildingCards: retrieveFromNonPropertyPile
};

const forceRetrieveFromPropertyPile = (player, pileName) => {
  let size1 = player.field[pileName].length;
  for (let i = 0; i < size1; i++) {
    let size2 = player.field[pileName][i].length;
    for (let j = 0; j < size2; j++) {
      return {
        card: player.field[pileName][i][j],
        source: {
          pileName,
          pile: player.field[pileName][i]
        }
      };
    }
  }
  return false;
};

const forceRetrieveFromNonPropertyPile = (player, pileName) => {
  for (let i = 0; i < player.field[pileName].length; i++) {
    return {
      card: player.field[pileName][i],
      source: {
        pileName,
        pile: player.field[pileName]
      }
    };
  }
  return false;
};

const forceRetrieveFromPile = {
  propertyCards: forceRetrieveFromPropertyPile,
  bankCards: forceRetrieveFromNonPropertyPile,
  buildingCards: forceRetrieveFromNonPropertyPile
};

const pickCard = ({
  Game,
  player,
  targetPlayer,
  pileNames,
  pileName,
  forced,
  callback
}) =>
  userActions.pickCardId({
    Game,
    requiredPlayerId: player.id,
    message: 'picking a field card',
    forced,
    callback: ({ cardId, cancelled, forced }) => {
      if (cancelled) {
        pickFieldCard({ Game, player, targetPlayer, pileNames, callback });
      } else if (forced) {
        let cardExist = forceRetrieveFromPile[pileName](targetPlayer, pileName);
        if (cardExist) {
          callback({ card: cardExist.card, source: cardExist.source, forced });
        } else {
          pickFieldCard({
            Game,
            player,
            targetPlayer,
            pileNames,
            forced,
            callback
          });
        }
      } else {
        let cardExist = retrieveFromPile[pileName](
          targetPlayer,
          pileName,
          cardId
        );
        if (cardExist) {
          callback({ card: cardExist.card, source: cardExist.source });
        } else {
          pickFieldCard({ Game, player, targetPlayer, pileNames, callback });
        }
      }
    }
  });

const pickFieldCard = ({
  Game,
  player,
  targetPlayer,
  pileNames,
  forced,
  callback
}) => {
  if (forced) {
    let size = pileNames.length;
    for (let i = 0; i < size; i++) {
      if (targetPlayer.field[pileNames[i]].length) {
        pickCard({
          Game,
          player,
          targetPlayer,
          pileNames,
          pileName: pileNames[i],
          forced,
          callback
        });
        break;
      }
    }
  } else {
    userActions.pickOption({
      Game,
      requiredPlayerId: player.id,
      message: 'picking a field pile',
      options: pileNames,
      callback: ({ error, option: pileName, cancelled, forced }) => {
        if (error) {
          callback({ error });
        } else if (cancelled) {
          callback({ cancelled });
        } else if (forced) {
          let size = pileNames.length;
          for (let i = 0; i < size; i++) {
            if (targetPlayer.field[pileNames[i]].length) {
              pickCard({
                Game,
                player,
                targetPlayer,
                pileNames,
                pileName: pileNames[i],
                callback,
                forced
              });
              break;
            }
          }
        } else if (targetPlayer.field[pileName].length) {
          pickCard({
            Game,
            player,
            targetPlayer,
            pileNames,
            pileName,
            callback
          });
        } else {
          callback({ error: 'pile is empty' });
        }
      }
    });
  }
};

module.exports = pickFieldCard;
