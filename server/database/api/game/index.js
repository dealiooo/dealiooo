const Op = require('Sequelize').Op;

const ACTION = 'action';
const BANK = 'bank';
const BUILDING = 'building';
const DECK = 'deck';
const DISCARD = 'discard';
const DOUBLE_THE_RENT = 'double-the-rent';
const HAND = 'hand';
const HOUSE = 'house';
const HOTEL = 'hotel';
const PROPERTY = 'property';
const PROPERTY_SET = 'property_set';
const PROPERTY_WILDCARD = 'property-wildcard';
const RAILROAD = 'railroad';
const UTILITY = 'utility';

const getPlayer = db => th_player_id =>
  db.th_players.findOne({ where: { id: th_player_id } });

const getCard = db => th_pile_card_id =>
  db.th_pile_cards.findOne({ where: { id: th_pile_card_id } });

const getPilesByTypes = db => (th_player_id, types) => {
  if ('object' === typeof th_player_id) {
    return th_player_id
      .getGame()
      .then(game => game.getPlayers({ where: { th_user_id: 1 } }))
      .then(global_seed_player =>
        db.th_piles.findAll({
          where: {
            th_player_id: global_seed_player.id,
            type: {
              [Op.or]: types
            }
          }
        })
      );
  } else {
    return db.th_piles.findAll({
      where: {
        th_player_id,
        type: {
          [Op.or]: types
        }
      }
    });
  }
};

const getRentByMainColor = db => main_color =>
  db.th_rents.findOne({
    where: {
      main_color
    }
  });

const insertEmptySet = db => th_player_id =>
  db.th_piles.create({
    th_player_id,
    type: PROPERTY_SET
  });

const removeSetIfEmptySet = db => pile =>
  pile.getCards().then(cards => {
    if (!cards.length) {
      db.th_piles.destroy({ where: { id: pile.id } });
    }
    return cards.length;
  });

const moveCard = _ => (card, pile) =>
  card
    .getPile()
    .then(oldPile =>
      oldPile
        .getCards({ where: `order > ${card.order}` })
        .then(cards => cards.decrement('order', { by: 1 }))
    )
    .then(_ =>
      pile.getCards().then(cards =>
        card.update({
          th_pile_id: pile.id,
          order: cards.length
        })
      )
    );

const movePile = _ => (oldPile, newPile) =>
  newPile.getCards().then(newPileCards =>
    oldPile
      .getCards()
      .then(cards => cards.increment('order', { by: newPileCards.length }))
      .then(cards => cards.update({ th_pile_id: newPile.id }))
  );

const swapPropertyCard = _ => (cardA, cardB) =>
  cardA.getPile().then(pileA =>
    pileA.getPlayer().then(playerA =>
      cardB.getPile().then(pileB =>
        pileB
          .getPlayer()
          .then(playerB => movePropertyToNewSet(cardA, playerB))
          .then(_ => movePropertyToNewSet(cardB, playerA))
      )
    )
  );

const movePropertyToNewSet = db => (card, player) =>
  card.getPile().then(oldPile =>
    db.th_piles
      .create({ th_player_id: player.id, type: PROPERTY_SET })
      .then(newPile => moveCard(card, newPile))
      .then(_ => removeSetIfEmptySet(oldPile))
  );

const shufflePile = _ => pile =>
  pile.getCards().then(cards =>
    Promise.all(
      cards.map((_, i) => {
        let j = Math.floor(Math.random() * (i + 1));
        return cards[i]
          .update({ order: card[j].order })
          .then(_ => cards[j].update({ order: card[i].order }));
      })
    )
  );

const switchColor = db => (card, main_color) =>
  card
    .update({ main_color })
    .then(_ => db.th_pile_cards.findOne({ where: { id: card, id } }));

const removePlayer = db => player =>
  player.getGame().then(game =>
    game
      .getPlayers({ where: `order > ${player.order}` })
      .then(players =>
        players
          .decrement('order', { by: 1 })
          .then(_ => db.th_player_id.destroy({ where: { id: player.id } }))
      )
      .then(_ => game.decrement('player_count', { by: 1 }))
  );

const startGame = db => id =>
  db.th_players
    .findOne({ where: { id } })
    .then(player => player.getGame())
    .then(game =>
      game
        .getPlayers()
        .then(players => shufflePlayerOrder(db)(players))
        .then(_ => generateDeckAndShuffle(db)(game))
    );

const shufflePlayerOrder = _ => players =>
  Promise.all(
    players.map((_, i) => {
      let j = Math.floor(Math.random() * (i + 1));
      return players[i]
        .update({ order: players[j].order })
        .then(_ => players[j].update({ order: players[i].order }));
    })
  );

const generateDeckAndShuffle = db => game =>
  db.th_players.create({ th_user_id: 1, th_game_id: game }).then(gm =>
    gm.getPiles({ where: { type: DECK } }).then(piles =>
      db.th_cards.findAll().then(cards =>
        Promise.all(
          cards.map((card, i) =>
            db.th_pile_cards.create({
              th_pile_id: piles[0].id,
              name: card.name,
              value: card.value,
              type: card.type,
              main_color: card.main_color,
              colors: card.colors,
              order: i
            })
          )
        ).then(_ => shufflePile(piles[0]))
      )
    )
  );

const updateCurrentPlayer = _ => player =>
  player.getGame().then(game =>
    game
      .getPlayers({
        where: { order: (game.turn % (game.player_count - 1)) + 1 }
      })
      .then(players =>
        game.update({ current_player: players[0].id, cards_played: 0 })
      )
  );

module.exports = db => ({
  removePlayer: removePlayer(db),
  startGame: startGame(db),
  endGame: endGame(db)
});
