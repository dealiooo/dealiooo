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

const swapPropertyCard = db => (cardA, cardB) =>
  cardA.getPile().then(pileA =>
    pileA.getPlayer().then(playerA =>
      cardB.getPile().then(pileB =>
        pileB.getPlayer().then(playerB =>
          db.th_piles
            .create({ th_player_id: playerA.id, type: PROPERTY_SET })
            .then(newPileA =>
              db.th_piles
                .create({ th_player_id: playerB.id, type: PROPERTY_SET })
                .then(newPileB => moveCard(cardA, newPileB))
                .then(_ => moveCard(cardB, newPileA))
                .then(_ => removeSetIfEmptySet(db)(pileA))
                .then(_ => removeSetIfEmptySet(db)(pileB))
            )
        )
      )
    )
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

const switchColor = _ => (card, main_color) => card.update({ main_color });

const removePlayer = db => player =>
  player
    .getGame()
    .then(game =>
      game
        .getPlayers({ where: `order > ${player.order}` })
        .then(players =>
          players
            .decrement('order', { by: 1 })
            .then(_ => db.th_player_id.destroy({ where: { id: player.id } }))
        )
    );

module.exports = db => ({
  ACTION,
  BANK,
  BUILDING,
  DECK,
  DISCARD,
  DOUBLE_THE_RENT,
  HAND,
  HOUSE,
  HOTEL,
  PROPERTY,
  PROPERTY_SET,
  PROPERTY_WILDCARD,
  RAILROAD,
  UTILITY,
  getPlayer: getPlayer(db),
  getCard: getCard(db),
  getPilesByTypes: getPilesByTypes(db),
  getRentByMainColor: getRentByMainColor(db),
  insertEmptySet: insertEmptySet(db),
  removeSetIfEmptySet: removeSetIfEmptySet(db),
  moveCard: moveCard(db),
  movePile: movePile(db),
  swapPropertyCard: swapPropertyCard(db),
  shufflePile: shufflePile(db),
  switchColor: switchColor(db),
  removePlayer: removePlayer(db)
});
