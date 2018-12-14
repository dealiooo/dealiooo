const Op = require('Sequelize').Op;

const getPileById = db => id =>
  db.th_piles.findOne({
    where: {
      id
    }
  });

const getPilesByTypes = db => (th_player_id, types) =>
  db.th_piles.findAll({
    where: {
      th_player_id,
      type: {
        [Op.or]: types
      }
    }
  });

const getRentByMainColor = db => main_color =>
  db.th_rents.findOne({
    where: {
      main_color
    }
  });

const insertEmptySet = db => th_player_id =>
  db.th_piles.create({
    th_player_id,
    type: 'property_set'
  });

const removeEmptySet = db => pile =>
  pile.getCards().then(cards => {
    if (!cards.length) {
      db.th_piles.destroy({ where: { id: pile.id } });
    }
    return cards.length;
  });

module.exports = db => ({
  getPileById: getPileById(db),
  getPilesByTypes: getPilesByTypes(db),
  getRentByMainColor: getRentByMainColor(db),
  insertEmptySet: insertEmptySet(db),
  removeEmptySet: removeEmptySet(db)
});
