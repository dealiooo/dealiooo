const gameActions = require('../../../gameActions');
const userControls = require('../../../userControls');

const pickFieldCardToSlyDeal = ({
  Game,
  player,
  targetPlayer,
  forced,
  callback
}) => {
  userControls.pickFieldCard({
    Game,
    player: targetPlayer,
    pileNames: ['propertyCards', 'buildingCards'],
    forced,
    callback: ({ error, card, source, cancelled, forced }) => {
      if (error) {
        callback({ error });
      } else if (cancelled) {
        console.log('slydeal: cant cancel this one');
        pickFieldCardToSlyDeal({ Game, player, targetPlayer, callback });
      } else {
        processSlyDeal({
          Game,
          player,
          targetPlayer,
          card,
          source,
          forced,
          callback
        });
      }
    }
  });
};

const processSlyDeal = ({
  Game,
  player,
  targetPlayer,
  card,
  source,
  forced,
  callback
}) => {
  if ('propertyCards' === source.pileName) {
    if (gameActions.getPropertySetStatus({ Game, destination: source.pile })) {
      if (forced) {
        forcedPickFieldCardToSlyDeal({ Game, player, targetPlayer, callback });
      } else {
        pickFieldCardToSlyDeal({ Game, player, targetPlayer, callback });
      }
    } else {
      player.field.propertyCards.push([]);
      gameActions.moveCard({
        source: source.pile,
        destination:
          player.field.propertyCards[player.field.propertyCards.length - 1],
        card
      });
      gameActions.removeEmptyPropertySets({ player: targetPlayer });
      callback({ card });
    }
  } else {
    gameActions.moveCard({
      source: source.pile,
      destination: player.field[source.pileName],
      card
    });
    callback({ card });
  }
};

const forcedPickFieldCardToSlyDeal = ({
  Game,
  player,
  targetPlayer,
  callback
}) => {
  let canSlyDeal = false;
  let card, source;
  if (0 !== targetPlayer.field['buildingCards'].length) {
    (card = targetPlayer.field['buildingCards'][0]),
      (source = {
        pileName: 'buildingCards',
        pile: targetPlayer.field['buildingCards']
      });
    canSlyDeal = true;
  } else {
    let size = targetPlayer.field['propertyCards'].length;
    for (let i = 0; i < size; i++) {
      if (
        gameActions.getPropertySetStatus({
          Game,
          destination: targetPlayer.field['propertyCards'][i]
        })
      ) {
        card = targetPlayer.field['propertyCards'][i][0];
        source = {
          pileName: 'propertyCards',
          pile: targetPlayer.field['propertyCards'][i]
        };
        canSlyDeal = true;
        break;
      }
    }
  }
  if (canSlyDeal) {
    processSlyDeal({ Game, player, targetPlayer, card, source, callback });
  } else {
    callback({ card });
  }
};

module.exports = ({ Game, player, card, callback }) => {
  userControls.pickTargetPlayer({
    Game,
    player,
    callback: ({ error, targetPlayer, cancelled, forced }) => {
      if (error || cancelled || forced) {
        callback({ error, cancelled, forced });
      } else {
        gameActions.moveCard({
          source: player.hand,
          destination: player.field.actionCards,
          card
        });
        gameActions.onNonCounterCardPlayed({ Game, card });
        gameActions.avoidAction({
          Game,
          player: targetPlayer,
          sourcePlayer: player,
          callback: ({ avoid, forced }) => {
            if (avoid || forced) {
              callback({ card });
            } else {
              pickFieldCardToSlyDeal({ Game, player, targetPlayer, callback });
            }
          }
        });
      }
    }
  });
};
