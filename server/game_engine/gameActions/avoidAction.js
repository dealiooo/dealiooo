const { pickYesOrNo } = require('./../userControls');
const moveCard = require('./moveCard');

const sourcePlayerAvoid = (Game, player, targetPlayer, callback) => {
    pickYesOrNo(Game, player, "Play just say no?", (_, play) => {
        if (play) {
            let found = false;
            for (let i = 0; i < player.hand.length; i++) {
                if ("just-say-no" === player.hand[i].name) {
                    Game.cards_played_list.push(player.hand[i]);
                    moveCard(player.hand, player.field.action_cards, player.hand[i]);
                    targetPlayerAvoid(Game, targetPlayer, player, callback);
                    found = true;
                    break;
                }
            }
            if (!found) {
                callback(null, true);
            }
        } else {
            callback(null, true);
        }
    })
}

const targetPlayerAvoid = (Game, player, sourcePlayer, callback) => {
    pickYesOrNo(Game, player, "Play just say no?", (_, play) => {
        if (play) {
            let found = false;
            for (let i = 0; i < player.hand.length; i++) {
                if ("just-say-no" === player.hand[i].name) {
                    Game.cards_played_list.push(player.hand[i]);
                    moveCard(player.hand, player.field.action_cards, player.hand[i]);
                    sourcePlayerAvoid(Game, sourcePlayer, player, callback);
                    found = true;
                    break;
                }
            }
            if (!found) {
                callback(null, false);
            }
        } else {
            callback(null, false);
        }
    })
}

module.exports = targetPlayerAvoid;