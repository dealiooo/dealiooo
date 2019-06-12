const gameControls = require('./gameControls');
const userControls = require('./userControls');

const game_engine = {
  start: users => {
    let Game = gameControls.startGame({ users });
    Game.ticks = {};
    game_engine.resetPlayersTick(Game);
    setInterval(game_engine.tick, 1000, Game);
    game_engine.applyStartTurn(Game);
    return Game;
  },
  resetPlayerTick: (Game, playerId) => {
    Game.ticks[playerId] = 60;
  },
  resetPlayersTick: Game => {
    Game.players.map(player => game_engine.resetPlayerTick(Game, player.id));
  },
  tick: Game => {
    if (Game.pendingForUserInput) {
      let playerId = Game.pendingForUserInput.arguments.requiredPlayerId;
      Game.ticks[playerId]--;
      if (0 >= Game.ticks[playerId]) {
        game_engine.applyForceAction(Game, playerId);
        game_engine.resetPlayerTick(Game, playerId);
      }
    }
  },
  input: (Game, userInput, playerId) => {
    Game.userInput = userInput;
    let returnValue = '';
    let pending = Game.pendingForUserInput;
    if (pending) {
      pending.arguments.playerId = playerId;
      returnValue = pending.function(pending.arguments);
    } else if (null !== Game.winner) {
      returnValue = game_engine.applyPlayerWon(Game);
    } else {
      returnValue = '\ngame is not running :(';
    }
    return returnValue;
  },
  getVars: (Game, playerId) => {
    let data = {};
    game_engine.getGeneralInfo(Game, data);
    game_engine.getPlayersInfo(Game, playerId, data);
    game_engine.getOptionsInfo(Game, data);
    return data;
  },
  getGeneralInfo: (Game, data) => {
    data.general_info = {};
    data.general_info.turnCount = Game.turnCount;
    data.general_info.currentPlayerId =
      Game.players[Game.turnCount % Game.playerCount].id;
    data.general_info.currentPlayerUsername =
      Game.players[Game.turnCount % Game.playerCount].username;
    data.general_info.cardsPlayed = Game.cardsPlayed;
    data.general_info.deckCount = Game.deck.length;
    data.general_info.discard = Game.discard;
    data.general_info.tick = Game.ticks[data.general_info.currentPlayerId];
  },
  getPlayersInfo: (Game, playerId, data) => {
    data.players_info = [];
    return Game.players.map(player => {
      let tempPlayer = {};
      tempPlayer.id = player.id;
      tempPlayer.username = player.username;
      if (player.id === playerId) {
        tempPlayer.hand_cards = player.hand;
      } else {
        tempPlayer.hand_cards = player.hand.length;
      }
      tempPlayer.actionCards = player.field.actionCards;
      tempPlayer.bankCards = player.field.bankCards;
      tempPlayer.buildingCards = player.field.buildingCards;
      tempPlayer.propertyCards = player.field.propertyCards;
      data.players_info.push(tempPlayer);
    });
  },
  getOptionsInfo: (Game, data) => {
    data.prompts_info = {};
    let pending = Game.pendingForUserInput;
    if (pending) {
      data.prompts_info.promptPlayerId = pending.arguments.requiredPlayerId;
      data.prompts_info.promptPlayerUsername = Game.players.filter(
        player => player.id === pending.arguments.requiredPlayerId
      )[0].username;
      data.prompts_info.promptMessage = pending.message;
      if (pending.arguments.options) {
        data.prompts_info.options = pending.arguments.options;
      }
    }
  },
  promptBasicOptions: Game => {
    let applyBasicOptions = {
      'Play Hand Card': game_engine.promptHandCardId,
      'Move Card Around': game_engine.promptMoveCardAround,
      'End Turn': game_engine.applyEndTurn
    };
    let player = Game.players[Game.turnCount % Game.playerCount];
    userControls.pickBasicOptions({
      Game,
      player,
      callback: ({ error, option, cancelled, forced }) => {
        if (error || cancelled) {
          game_engine.promptBasicOptions(Game);
        } else if (forced) {
          game_engine.applyForced(Game);
        } else {
          applyBasicOptions[option](Game);
        }
      }
    });
  },
  promptMoveCardAround: Game => {
    let applyMoveCardAround = {
      'Pick Source and Destination': game_engine.promptSourceAndDestination,
      'Go Back': game_engine.promptBasicOptions
    };
    let player = Game.players[Game.turnCount % Game.playerCount];
    userControls.moveCardAround({
      Game,
      player,
      callback: ({ error, option, cancelled, forced }) => {
        if (error || cancelled) {
          game_engine.promptBasicOptions(Game);
        } else if (forced) {
          game_engine.applyForced(Game);
        } else {
          applyMoveCardAround[option](Game);
        }
      }
    });
    if (gameControls.computeWinCondition({ Game, player })) {
      return game_engine.applyPlayerWon(Game);
    }
  },
  promptHandCardId: Game => {
    let player = Game.players[Game.turnCount % Game.playerCount];
    userControls.pickHandCard({
      Game,
      player,
      callback: ({ error, card, cancelled, forced }) => {
        if (error || cancelled) {
          game_engine.promptBasicOptions(Game);
        } else if (forced) {
          game_engine.applyForced(Game);
        } else {
          game_engine.applyPlayCard(Game, card);
        }
      }
    });
  },
  promptSourceAndDestination: Game => {
    let player = Game.players[Game.turnCount % Game.playerCount];
    gameControls.moveCardAround({
      Game,
      player,
      callback: ({ error, cancelled, forced }) => {
        if (error) {
          game_engine.promptBasicOptions(Game);
        } else if (cancelled) {
          game_engine.promptMoveCardAround(Game);
        } else if (forced) {
          game_engine.applyForced(Game);
        } else if (!gameControls.computeWinCondition({ Game, player })) {
          game_engine.promptBasicOptions(Game);
        }
      }
    });
  },
  applyPlayCard: (Game, card) => {
    let player = Game.players[Game.turnCount % Game.playerCount];
    gameControls.playCard({
      Game,
      player,
      card,
      callback: ({ error, cancelled, forced }) => {
        if (error) {
          game_engine.promptBasicOptions(Game);
        } else if (cancelled) {
          game_engine.promptHandCardId(Game);
        } else if (forced) {
          game_engine.applyForced(Game);
        } else {
          game_engine.resetPlayersTick(Game);
          if (gameControls.computeWinCondition({ Game, player })) {
            return game_engine.applyPlayerWon(Game);
          } else {
            if (gameControls.forcePlayerEndTurn({ Game })) {
              game_engine.applyEndTurn(Game);
            } else {
              game_engine.promptBasicOptions(Game);
            }
          }
        }
      }
    });
  },
  applyStartTurn: Game => {
    game_engine.resetPlayersTick(Game);
    let player = Game.players[Game.turnCount % Game.playerCount];
    gameControls.startTurn({ Game, player });
    game_engine.promptBasicOptions(Game);
  },
  applyPlayerWon: Game => {
    return `\nPlayer (id:${
      Game.winner.id
    }) won! 🎉🎉🎉 Woohoo! 🎉🎉🎉 Congrats!`;
  },
  applyEndTurn: (Game, force) => {
    if (null === Game.pendingForUserInput || force) {
      gameControls.endTurn({
        Game,
        callback: _ => {
          Game.turnCount++;
          game_engine.applyStartTurn(Game);
        }
      });
    }
    return ``;
  },
  applyLeaveGame: (Game, playerId) => {
    game_engine.resetPlayersTick(Game);
    let player = Game.players[Game.turnCount % Game.playerCount];
    if (player.id === playerId) {
      gameControls.forfeit({ Game, player });
    }
  },
  applyForced: Game => {
    Game.cardsPlayed++;
    game_engine.resetPlayersTick(Game);
    if (gameControls.forcePlayerEndTurn({ Game })) {
      game_engine.applyEndTurn(Game, true);
    } else {
      game_engine.promptBasicOptions(Game);
    }
  },
  applyCancelAction: (Game, playerId) => {
    let returnValue = '';
    let pending = Game.pendingForUserInput;
    if (pending) {
      pending.arguments.playerId = playerId;
      pending.arguments.cancelled = true;
      returnValue = pending.function(pending.arguments);
    }
    return returnValue;
  },
  applyForceAction: (Game, playerId) => {
    let returnValue = '';
    let pending = Game.pendingForUserInput;
    if (pending) {
      pending.arguments.playerId = playerId;
      pending.arguments.forced = true;
      returnValue = pending.function(pending.arguments);
    }
    return returnValue;
  },
  onEndTurn: (Game, playerId) => {
    let player = Game.players[Game.turnCount % Game.playerCount];
    let pending = Game.pendingForUserInput;
    if (null !== pending) {
      if (pending.arguments.options) {
        if (
          pending.arguments.options.filter(option => 'End Turn' === option)
            .length
        ) {
          if (player.id === playerId) {
            Game.pendingForUserInput = null;
            game_engine.applyEndTurn(Game);
            return `\nEnding Turn...`;
          }
        }
      }
    }
    return `\nEnd Turn is not available`;
  },
  onForfeit: (Game, playerId) => {
    let nextPlayerIndex = (Game.turnCount + 1) % Game.playerCount;
    if (0 !== nextPlayerIndex) {
      nextPlayerIndex--;
    }
    game_engine.applyLeaveGame(Game, playerId);
    if (
      gameControls.computeWinCondition({
        Game,
        player: Game.players[nextPlayerIndex]
      })
    ) {
      return game_engine.applyPlayerWon(Game);
    }
    return ``;
  },
  onCancelAction: (Game, playerId) => {
    game_engine.applyCancelAction(Game, playerId);
  },
  onForceAction: (Game, playerId) => {
    game_engine.applyForceAction(Game, playerId);
  }
};

module.exports = game_engine;
