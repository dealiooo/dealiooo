const gameActions = require('../gameActions');
const userControls = require('../userControls');

const endTurn = ({ Game, forced, callback }) => {
  Game.cardsPlayed = 0;
  Game.cardsPlayedList = [];
  Game.players.map(player =>
    gameActions.movePile({
      source: player.field.actionCards,
      destination: Game.discard
    })
  );
  const player = Game.currentPlayer;
  discardExcessHandCard({ Game, player, forced, callback });
};

const discardExcessHandCard = ({ Game, player, forced, callback }) => {
  if (gameActions.getHasSevenOrLessCards({ player })) {
    callback({ forced });
  } else {
    userControls.pickHandCard({
      Game,
      player,
      message: 'Picking a hard card to discard',
      forced,
      callback: ({ forced, card }) => {
        gameActions.moveCard({
          source: player.hand,
          destination: Game.discard,
          card
        });
        discardExcessHandCard({ Game, player, forced, callback });
      }
    });
  }
};

module.exports = endTurn;
