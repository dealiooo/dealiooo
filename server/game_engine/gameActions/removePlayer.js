module.exports = (Game, player) => {
  Game.players = Game.players.filter(p => p.id !== player.id);
};
