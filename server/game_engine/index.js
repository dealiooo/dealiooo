const gameControls = require("./gameControls");
const userControls = require("./userControls");

const game_engine = {
  start: playerIds => {
    let Game = gameControls.startGame(playerIds);
    game_engine.applyStartTurn(Game);
    return Game;
  },
  input: (Game, user_input, player_id) => {
    Game.user_input = user_input;
    let returnValue = "";
    let pending = Game.pending_for_user_input;
    if (pending) {
      returnValue = pending.function(Game, pending.arguments, player_id);
    } else if (null !== Game.winner) {
      returnValue = game_engine.applyPlayerWon(Game);
    } else {
      returnValue = "\ngame is not running :(";
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
    data.general_info.turnCount = Game.turn_count;
    data.general_info.currentPlayer =
      Game.players[Game.turn_count % Game.player_count].id;
    data.general_info.cardsPlayed = Game.cards_played;
    data.general_info.deckCount = Game.deck.length;
    data.general_info.discardCount = Game.discard.length;
  },
  getPlayersInfo: (Game, playerId, data) => {
    data.players_info = [];
    return Game.players.map(player => {
      let tempPlayer = {};
      tempPlayer.id = player.id;
      if (player.id === playerId) {
        tempPlayer.hand = player.hand;
      } else {
        tempPlayer.hand = player.hand.length;
      }
      tempPlayer.action_cards = player.field.action_cards;
      tempPlayer.bank_cards = player.field.bank_cards;
      tempPlayer.building_cards = player.field.building_cards;
      tempPlayer.property_cards = player.field.property_cards;
      data.players_info.push(tempPlayer);
    });
  },
  getOptionsInfo: (Game, data) => {
    data.prompts_info = {};
    let pending = Game.pending_for_user_input;
    if (pending) {
      data.prompts_info.promptPlayer = pending.arguments.player;
      data.prompts_info.promptMessage = pending.message;
      if (pending.arguments.options) {
        data.prompts_info.options = pending.arguments.options;
      }
    }
  },
  promptBasicOptions: Game => {
    let applyBasicOptions = {
      "Play Hand Card": game_engine.promptPlayHandCard,
      "Move Card Around": game_engine.promptMoveCardAround,
      "End Turn": game_engine.applyEndTurn
    };
    let player = Game.players[Game.turn_count % Game.player_count];
    userControls.pickBasicOptions(Game, player, (error, option) => {
      if (error) {
        game_engine.promptBasicOptions(Game);
      } else {
        applyBasicOptions[option](Game);
      }
    });
  },
  promptPlayHandCard: Game => {
    let applyPlayHandCard = {
      "Pick Card Id": game_engine.promptHandCardId,
      "Go Back": game_engine.promptBasicOptions
    };
    let player = Game.players[Game.turn_count % Game.player_count];
    userControls.playHandCard(Game, player, (error, option) => {
      if (error) {
        game_engine.promptBasicOptions(Game);
      } else {
        applyPlayHandCard[option](Game);
      }
    });
  },
  promptMoveCardAround: Game => {
    let applyMoveCardAround = {
      "Pick Source and Destination": game_engine.promptSourceAndDestination,
      "Go Back": game_engine.promptBasicOptions
    };
    let player = Game.players[Game.turn_count % Game.player_count];
    userControls.moveCardAround(Game, player, (error, option) => {
      if (error) {
        game_engine.promptBasicOptions(Game);
      } else {
        applyMoveCardAround[option](Game);
      }
    });

    if (gameControls.computeWinCondition(Game)) {
      return game_engine.applyPlayerWon(Game);
    }
  },
  promptHandCardId: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    userControls.pickHandCard(Game, player, (error, card) => {
      if (error) {
        game_engine.promptBasicOptions(Game);
      } else {
        game_engine.applyPlayCard(Game, card);
      }
    });
  },
  promptSourceAndDestination: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.moveCardAround(Game, player, error => {
      if (error) {
        game_engine.promptBasicOptions(Game);
      } else if (!gameControls.computeWinCondition(Game, player)) {
        game_engine.promptBasicOptions(Game);
      }
    });
  },
  applyPlayCard: (Game, card) => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.playCard(Game, player, card, (error, _) => {
      if (error) {
        game_engine.promptBasicOptions(Game);
      } else {
        if (gameControls.computeWinCondition(Game)) {
          return game_engine.applyPlayerWon(Game);
        } else {
          if (gameControls.forcePlayerEndTurn(Game)) {
            game_engine.applyEndTurn(Game);
          } else {
            game_engine.promptBasicOptions(Game);
          }
        }
      }
    });
  },
  applyStartTurn: Game => {
    let player = Game.players[Game.turn_count % Game.player_count];
    gameControls.startTurn(Game, player);
    game_engine.promptBasicOptions(Game);
  },
  applyPlayerWon: Game => {
    return `\nPlayer (id:${
      Game.winner.id
    }) won! 🎉🎉🎉 Woohoo! 🎉🎉🎉 Congrats!`;
  },
  applyEndTurn: Game => {
    if (null === Game.pending_for_user_input) {
      gameControls.endTurn(Game, _ => {
        Game.turn_count++;
        game_engine.applyStartTurn(Game);
      });
    }
    return ``;
  },
  applyLeaveGame: (Game, playerId) => {
    let player = Game.players[Game.turn_count % Game.player_count];
    if (player.id === playerId) {
      gameControls.forfeit(Game, player);
    }
  },
  onEndTurn: (Game, playerId) => {
    let player = Game.players[Game.turn_count % Game.player_count];
    let pending = Game.pending_for_user_input;
    if (null !== pending) {
      if (pending.arguments.options) {
        if (
          pending.arguments.options.filter(option => "End Turn" === option)
            .length
        ) {
          if (player.id === playerId) {
            Game.pending_for_user_input = null;
            game_engine.applyEndTurn(Game);
            return `\nEnding Turn...`;
          }
        }
      }
    }
    return `\nEnd Turn is not available`;
  },
  onLeaveGame: (Game, player_id) => {
    game_engine.applyLeaveGame(Game, player_id);
    if (gameControls.computeWinCondition(Game)) {
      return game_engine.applyPlayerWon(Game);
    }
    return ``;
  }
};

module.exports = game_engine;
