export default {
  Summary: [
    'dealiooo is a game where players collect properties and money, steal cards from other players, charge people rent, swap cards, counter other peoples cards, and much more!',
  ],
  'Win Condition': ['Formulate three different colored property sets to win the game.'],
  Gameplay: [
    'Shuffle the deck and deal 5 cards to each player, face down.',
    'If you have no cards at hand, draw 2 cards.',
    'If the draw pile runs out, shuffle the discard pile and this becomes the new draw pile.',
    'Play up to 3 cards from your hand during your turn. You dont have to play a card',
    'Discard extra cards if you have more than 7 cards at hand to the center until you have 7 cards at hand',
  ],
  Cards: [
    'There are 110 cards in the game',
    '34 action cards',
    '28 property cards',
    '11 property wildcards',
    '11 rent cards',
    '13 rent wildcards',
    '20 money cards',
  ],
  'Payment Mechanism': [
    'Players cannot pay with their hand cards.',
    'Multi-colored wildcards cannot be used as a payment.',
    'If a player cannot afford to pay, the player only needs to pay as much as the player could afford.',
    'If a player has only multi-colored wildcards or none on the player field, then the player doesn’t need to pay.',
    'A player may pay by any combination of cash, properties, or both.',
    'Change is not given.',
    'Payments stay on the table. If a player pays with properties, those properties go into the payee property section.',
  ],
  'Money Cards': ['Money cards go into your bank pile and you can use them to pay other players'],
  'Property Cards': [
    'When played, place the cards in your property collection.',
    'Each property card shows the amount of same colored card needed to complete the set.',
  ],
  'Property Wildcards': [
    'Property wildcards can be used as substitutes for property cards of the colors on the wildcard.',
    'Property sets consisting of only wildcards are not valid.',
    'Wildcards can be swap around during the player turn.',
    'Types of property wildcards followed by their counts followed by their monetary values:',
    'This card does not carry any monetary value.',
  ],
  'Action Cards': [
    'When played, place the cards either in the center or in your bank.',
    'Place the card in the center if you want to execute the action.',
    'Place the card in your bank if you want to play the action card as a money card.',
  ],
  'Rent Cards': [
    'Must have property cards in the field to charge rent',
    'All players pay you rent in one of the two colors of the card',
  ],
  'Rent Wildcards': [
    'Forces one player to pay you rent for chosen color',
    'This card does not carry any monetary value.',
  ],
};
