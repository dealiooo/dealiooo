const globalVars = require('../globalVars');
const gameActions = require('../gameActions');

module.exports = ({ users }) => {
  let Game = globalVars(users);
  for (let i = 0; i < 5 * users.length; i++) {
    gameActions.drawCard({ Game, player: Game.players[i % users.length] });
  }
  return Game;
};
