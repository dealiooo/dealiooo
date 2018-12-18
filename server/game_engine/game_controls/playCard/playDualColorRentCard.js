const gameActions = require('./../../game_actions');
const userActions = require('./../../user_actions');
const userControls = require('./../../user_controls');

const OPTIONS = ['bank', 'action'];

const playAsMoney = (player, card, callback) =>
  gameActions.moveCardToBank(player, card).then(_ => callback(null, card));

const playAsDualColorRent = (player, card, callback) =>
  userControls.pick_card_color(player, card, (error, color) => {
    if (error) {
      return callback(error);
    } else {
      return gameActions.switchColor(card, color).then(card =>
        gameActions.getDestinations[card.type]({ player, card }).then(
          destinations => {
            if (destinations.length) {
              return pickTargetToRent(player, card, destinations, callback);
            } else {
              return callback('cannot play rent card no matching color');
            }
          }
        )
      );
    }
  });

const pickTargetToRent = (player, card, destinations, callback) =>
  userActions.pick_option({
    player,
    options: destinations.map(e => e.id),
    callback: (error, id) => {
      if (error) {
        return callback(error);
      } else {
        return gameActions.moveCardToAction(player, card).then(_ =>
          gameActions
            .getRentValue(
              player,
              destinations.filter(destination => destination.id === id)
            )
            .then(amount =>
              player.getGame().then(game =>
                game.getPlayers({ where: 'order > 0' }).then(players =>
                  Promise.all(
                    players.map((payee, i) => {
                      let j = 0;
                      let done = () => {
                        if (++j === game.player_count - 1) {
                          return callback(null, card);
                        }
                      };
                      if (payee.id !== player.id) {
                        return game.gameActions.payRent(
                          payee,
                          player,
                          amount,
                          done
                        );
                      } else {
                        return null;
                      }
                    })
                  )
                )
              )
            )
        );
      }
    }
  });

module.exports = (player, card, callback) =>
  userActions.pick_option({
    player,
    options: OPTIONS,
    callback: (error, option) => {
      if (error) {
        return callback(error);
      } else if (OPTIONS[0] === option) {
        return playAsMoney(player, card, callback);
      } else {
        return playAsDualColorRent(player, card, callback);
      }
    }
  });
