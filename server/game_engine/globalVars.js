const cards = require('./cards');
const rentValues = require('./rentValues');

const initGlobalVars = users => {
  const Game = {};
  initGameVariables(Game, users);
  initGameUtility(Game);
  return Game;
};

const initGameVariables = (Game, users) => {
  Game.turnCount = 0;
  Game.cardsPlayed = 0;
  Game.cardsPlayedList = [];
  Game.rentValues = rentValues;
  Game.discard = [];
  Game.playerCount = users.length || random(2, 5);
  initDeck(Game);
  initPlayers(Game, users);
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
      colors: cards[i].colors.map(color => color),
    };
    Game.deck.push(card);
  }
  Game.deck = shuffle(Game.deck);
};

const initPlayers = (Game, users) => {
  const players = [];
  for (let i = 0; i < users.length; i++) {
    let player = {
      id: users[i].id,
      username: users[i].username,
      hand: [],
      field: {
        actionCards: [],
        propertyCards: [],
        bankCards: [],
        buildingCards: [],
      },
    };
    players.push(player);
  }
  Game.players = shuffle(players).splice(0, users.length);
  Game.currentPlayerIndex = 0;
  Game.currentPlayer = Game.players[Game.currentPlayerIndex];
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

module.exports = users => initGlobalVars(users);
