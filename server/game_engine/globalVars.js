const cards = require('./cards');
const rentValues = require('./rentValues');

const initGlobalVars = playerIds => {
  const Game = {};
  initGameVariables(Game, playerIds);
  initGameUtility(Game);
  return Game;
};

const initGameVariables = (Game, playerIds) => {
  Game.turnCount = 0;
  Game.cardsPlayed = 0;
  Game.cardsPlayedList = [];
  Game.rentValues = rentValues;
  Game.discard = [];
  Game.playerCount = playerIds.length || random(2, 5);
  initDeck(Game);
  initPlayers(Game, playerIds);
};

const initDeck = Game => {
  Game.deck = [];
  for (let i = 0; i < cards.length; i++) {
    let card = {
      id: cards[i].id,
      name: cards[i].name,
      value: cards[i].value,
      type: cards[i].type,
      mainColor: cards[i].mainColor,
      colors: cards[i].colors.map(color => color)
    };
    Game.deck.push(card);
  }
  Game.deck = shuffle(Game.deck);
};

const initPlayers = (Game, playerIds) => {
  const players = [];
  for (let i = 0; i < playerIds.length; i++) {
    let player = {
      id: playerIds[i],
      hand: [],
      field: {
        actionCards: [],
        propertyCards: [],
        bankCards: [],
        buildingCards: []
      }
    };
    players.push(player);
  }
  Game.players = shuffle(players).splice(0, playerIds.length);
};

const initGameUtility = Game => {
  Game.random = random;
  Game.shuffle = shuffle;
  Game.userInput = '';
  Game.pendingForUserInput = null;
  Game.winner = null;
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const shuffle = a => {
  const copyA = [].concat(a);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyA[i], copyA[j]] = [copyA[j], copyA[i]];
  }
  return copyA;
};

module.exports = playerIds => initGlobalVars(playerIds);
