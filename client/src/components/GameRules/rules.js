const rules = {
  'Win Condition': [
    'Form three property sets of unique color to win the game.'
  ],
  Setup: [
    'Remove the 4 Monopoly Deal Rule cards from the deck.',
    'Shuffle the deck and deal 5 cards to each player, face down.',
    'Decide who goes first. Play clockwise.'
  ],
  Gameplay: [
    'Draw 5 cards if you have no cards at hand, else draw 2 cards. If the draw pile runs out, shuffle the discard pile. This is the new draw pile.',
    'Play up to 3 cards',
    'Discard extra cards if you have more than 7 cards at hand to the center until you have 7 cards at hand.'
  ],
  'Card Rules': [
    'There are 110 cards in a pack.',
    'All cards beside rule cards and multi-colored wildcards have a monetary value specified either in the middle or on the corner of the cards.',
    'There are 4 rule cards in a pack. The rule cards explain the official rules'
  ],
  'Money Cards': [
    'There are 20 money cards in a pack.',
    'When played, place the cards in your bank pile.'
  ],
  'Property Cards': [
    'There are 28 property cards in a pack.',
    'When played, place the cards in your property collection.',
    'Each property card shows the amount of same colored card needed to complete the set.'
  ],
  'Property Wildcards': [
    'There are 11 property wildcards in a pack.',
    'When played, place the cards in your property collection.',
    'Property wildcards can be used as substitutes for property cards of the colors on the wildcard.',
    'Property sets consist of only wildcards are not valid.',
    'Wildcards can be swap around during the player turn.',
    'Types of property wildcards followed by their counts followed by their monetary values:'
  ],
  'Action Cards': [
    'There are 47 action cards in a pack.',
    'When played, place the cards either in the center or in your bank.',
    'Place the card in the center if you want to execute the action.',
    'Place the card in your bank if you want to play the action card as a money card.'
  ],
  'Payment Mechanism': [
    'Players cannot pay with their hand cards.',
    'Multi-colored wildcards cannot be used as a payment.',
    'No change is given.',
    'If a player cannot afford to pay, the player only needs to pay as much as the player could afford.',
    'If a player has only multi-colored wildcards or none on the player field, then the player doesn’t need to pay.',
    'A player may pay by any combination of cash, properties, or both.',
    'Payments stay on the table. If a player pays with properties, those properties go into the payee property section.'
  ]
};

export default rules;
