const Op = require('sequelize').Op;
const userActions = require('./../user_actions');
const { Game } = require('./../../database/api');

const pick_hand_card = (player, callback) =>
  userActions.pick_card_id({
    player,
    callback: (error, id) => {
      if (error) {
        callback(error);
        return {
          message: 'you just broke the game',
          pending: null
        };
      } else {
        return Game.getPilesByTypes(player.id, [Game.HAND]).then(piles =>
          piles[0].getCards({ where: { id } }).then(card => {
            if (card) {
              return callback(null, card);
            } else {
              return pick_hand_card(player, callback);
            }
          })
        );
      }
    }
  });

const pick_card_color = (player, card, callback) =>
  userActions.pick_option({
    player,
    options: card.colors,
    callback
  });

const pick_target_player = (player, callback) =>
  player
    .getGame()
    .then(game =>
      game.getPlayers({
        where: {
          id: {
            [Op.not]: player.id
          }
        }
      })
    )
    .then(players =>
      userActions.pick_option({
        player,
        options: players.map(player => player.id),
        callback: (error, targetPlayerId) => {
          if (error) {
            return callback(error);
          } else {
            return callback(null, targetPlayerId);
          }
        }
      })
    );

const pick_field_card = (player, piles, callback) =>
  Promise.all(piles.map(pile => pile.getCards())).then(pileCardsCollection => {
    if (pileCardsCollection.filter(pileCards => pileCards.length).length) {
      return userActions.pick_card_id({
        player,
        callback: (error, id) => {
          if (error) {
            callback(error);
            return {
              message: 'you just broke the game',
              pending: null
            };
          } else {
            let index = 0;
            let card = null;
            for (let i = 0; i < pileCardsCollection.length; i++) {
              for (let j = 0; j < pileCardsCollection[i].length; j++) {
                if (id === pileCardsCollection[i][j].id) {
                  index = j;
                  card = pileCardsCollection[i][j];
                }
              }
            }
            if (card) {
              return callback(null, card, piles[index]);
            } else {
              return pick_field_card(player, piles, callback);
            }
          }
        }
      });
    } else {
      console.log('pile is empty');
      return callback(new Error().stack);
    }
  });

const pick_valuable_field_card = (player, piles, callback) => {
  pick_field_card(player, piles, (error, card, pile) => {
    if (error) {
      return callback(error);
    } else if (card.value > 0) {
      return callback(null, card, pile);
    } else {
      return pick_valuable_field_card(player, piles, callback);
    }
  });
};

const pick_movable_card = (player, callback) =>
  Game.getPilesByTypes(player, [Game.PROPERTY_SET, Game.BUILDING]).then(piles =>
    pick_field_card(player, piles, callback)
  );

const pick_basic_options = (player, callback) =>
  Game.getPilesByTypes(player, [
    Game.HAND,
    Game.PROPERTY_SET,
    Game.BUILDING
  ]).then(piles =>
    Promise.all(piles.map(pile => pile.getCards())).then(
      pileCardsCollection => {
        let options = [];
        pileCardsCollection.forEach(pileCards =>
          pileCards.forEach(card => options.push(card.id))
        );
        options.push('End Turn');
        return userActions.pick_option({
          player,
          options,
          callback
        });
      }
    )
  );

module.exports = {
  pick_hand_card,
  pick_card_color,
  pick_target_player,
  pick_field_card,
  pick_valuable_field_card,
  pick_movable_card,
  pick_basic_options
};
