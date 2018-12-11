import * as gameActions from '../../../actions';

export const playItsMyBirthday = (player, card, callback) => {
  // all players give you $2M as a gift
  for (let i = 0; i < window.players.length; i++) {
    let done = error => {
      if (error) {
        callback(error);
      } else if (i + 1 === window.players.length) {
        callback(null, card);
      }
    };
    if (player.id !== window.players[i].id) {
      console.log(`${window.players[i].id}'s' turn to pay $2`);
      gameActions.payRent(window.players[i], player, 2, error => done(error));
    }
  }
};
