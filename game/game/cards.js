/**
 *
 * Card Format
 *
 * {
 *    id: Integer,
 *    name: String,
 *    type: String, One-of "Money, Property, Property-Wildcard, Action, Rent"
 *    value: Integer
 *    mainColor: String
 *    colors: [String]
 * }
 *
 * Possible Colors:
 * Green
 * Dark Blue
 * Light Blue
 * Red
 * Utility
 * Yellow
 * Orange
 * Brown
 * Purple
 * Railroad
 *
 * Card Quantities:
 *
 * Total Cards: 108
 *
 * 36 Action Cards
    2 Deal Breaker,
    2 Double The Rent Cards
    3 Just Say No,
    3 Sly Deal ,
    3 Debt Collector,
    3 Itâs My Birthday,
    3 House,
    3 Hotel,
    4 Force Deal,
    10 Pass Go,

 * 28 Property Cards
    2 Utility,
    2 Brown Set,
    2 Dark Blue,
    3 Green,
    3 Light Blue,
    3 Red,
    3 Yellow,
    3 Orange Set,
    3 Purple Set,
    4 Railroad Set

 * 11 Property Wilcards
    1 Light Blue and Brown wildcard,
    1 Light Blue and Railroad wildcard,
    1 Dark Blue and Green,
    1 Railroad and Green wildcard,
    1 Utility and Railroad wildcards,
    2 All-color wildcards
    2 Red and Yellow wilcards,
    2 Purple and Orange wildcards,

 * 13 Rent Cards:
    2 Purple and Orange rent cards
    2 Railroad and Utility rent cards,
    2 Green and Dark Blue rent cards,
    2 Brown and Light Blue rent cards,
    2 Red and Yellow rent cards
    3 All-color wild rent cards

 * 20 Money Cards:
    1 $10M money card,
    2 $5M money cards,
    3 $4M money cards,
    3 $3M * money cards,
    5 $2M money cards,
    6 $1M money cards.
 */

const property_cards = [
  {
    id: 1,
    name: 'baltic-avenue',
    value: 1,
    type: 'property',
    mainColor: 'brown',
    colors: []
  },
  {
    id: 2,
    name: 'mediterranean-avenue',
    value: 1,
    type: 'property',
    mainColor: 'brown',
    colors: []
  },
  {
    id: 3,
    name: 'boardwalk',
    value: 4,
    type: 'property',
    mainColor: 'dark-blue',
    colors: []
  },
  {
    id: 4,
    name: 'park-place',
    value: 4,
    type: 'property',
    mainColor: 'dark-blue',
    colors: []
  },
  {
    id: 5,
    name: 'north-carolina-avenue',
    value: 4,
    type: 'property',
    mainColor: 'green',
    colors: []
  },
  {
    id: 6,
    name: 'pacific-avenue',
    value: 4,
    type: 'property',
    mainColor: 'green',
    colors: []
  },
  {
    id: 7,
    name: 'pennsylvania-avenue',
    value: 4,
    type: 'property',
    mainColor: 'green',
    colors: []
  },
  {
    id: 8,
    name: 'connecticut-avenue',
    value: 1,
    type: 'property',
    mainColor: 'light-blue',
    colors: []
  },
  {
    id: 9,
    name: 'oriental-avenue',
    value: 1,
    type: 'property',
    mainColor: 'light-blue',
    colors: []
  },
  {
    id: 10,
    name: 'vermont-avenue',
    value: 1,
    type: 'property',
    mainColor: 'light-blue',
    colors: []
  },
  {
    id: 11,
    name: 'new-york-avenue',
    value: 2,
    type: 'property',
    mainColor: 'orange',
    colors: []
  },
  {
    id: 12,
    name: 'st.james-place',
    value: 2,
    type: 'property',
    mainColor: 'orange',
    colors: []
  },
  {
    id: 13,
    name: 'tennessee',
    value: 2,
    type: 'property',
    mainColor: 'orange',
    colors: []
  },
  {
    id: 14,
    name: 'st.charles-place',
    value: 2,
    type: 'property',
    mainColor: 'purple',
    colors: []
  },
  {
    id: 15,
    name: 'virginia-avenue',
    value: 2,
    type: 'property',
    mainColor: 'purple',
    colors: []
  },
  {
    id: 16,
    name: 'states-avenue',
    value: 2,
    type: 'property',
    mainColor: 'purple',
    colors: []
  },
  {
    id: 17,
    name: 'short-line',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    colors: []
  },
  {
    id: 18,
    name: 'b.-&-o.-railroad',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    colors: []
  },
  {
    id: 19,
    name: 'reading-railroad',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    colors: []
  },
  {
    id: 20,
    name: 'pennsylvania-railroad',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    colors: []
  },
  {
    id: 21,
    name: 'kentucky-avenue',
    value: 3,
    type: 'property',
    mainColor: 'red',
    colors: []
  },
  {
    id: 22,
    name: 'indiana-avenue',
    value: 3,
    type: 'property',
    mainColor: 'red',
    colors: []
  },
  {
    id: 23,
    name: 'illinois-avenue',
    value: 3,
    type: 'property',
    mainColor: 'red',
    colors: []
  },
  {
    id: 24,
    name: 'water-works',
    value: 2,
    type: 'property',
    mainColor: 'utility',
    colors: []
  },
  {
    id: 25,
    name: 'electric-company',
    value: 2,
    type: 'property',
    mainColor: 'utility',
    colors: []
  },
  {
    id: 26,
    name: 'ventnor-avenue',
    value: 3,
    type: 'property',
    mainColor: 'yellow',
    colors: []
  },
  {
    id: 27,
    name: 'marvin-gardens',
    value: 3,
    type: 'property',
    mainColor: 'yellow',
    colors: []
  },
  {
    id: 28,
    name: 'atlantic-avenue',
    value: 3,
    type: 'property',
    mainColor: 'yellow',
    colors: []
  }
];

const action_cards = [
  {
    id: 29,
    name: 'deal-breaker',
    value: 5,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 30,
    name: 'deal-breaker',
    value: 5,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 31,
    name: 'debt-collector',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 32,
    name: 'debt-collector',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 33,
    name: 'debt-collector',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 34,
    name: 'double-the-rent',
    value: 0,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 35,
    name: 'double-the-rent',
    value: 0,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 36,
    name: 'forced-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 37,
    name: 'forced-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 38,
    name: 'forced-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 39,
    name: 'forced-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 40,
    name: 'hotel',
    value: 4,
    type: 'building',
    mainColor: '',
    colors: []
  },
  {
    id: 41,
    name: 'hotel',
    value: 4,
    type: 'building',
    mainColor: '',
    colors: []
  },
  {
    id: 42,
    name: 'hotel',
    value: 4,
    type: 'building',
    mainColor: '',
    colors: []
  },
  {
    id: 43,
    name: 'house',
    value: 3,
    type: 'building',
    mainColor: '',
    colors: []
  },
  {
    id: 44,
    name: 'house',
    value: 3,
    type: 'building',
    mainColor: '',
    colors: []
  },
  {
    id: 45,
    name: 'house',
    value: 3,
    type: 'building',
    mainColor: '',
    colors: []
  },
  {
    id: 46,
    name: 'its-my-birthday',
    value: 2,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 47,
    name: 'its-my-birthday',
    value: 2,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 48,
    name: 'its-my-birthday',
    value: 2,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 49,
    name: 'just-say-no',
    value: 4,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 50,
    name: 'just-say-no',
    value: 4,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 51,
    name: 'just-say-no',
    value: 4,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 52,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 53,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 54,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 55,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 56,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 57,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 58,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 59,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 60,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 61,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 62,
    name: 'sly-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 63,
    name: 'sly-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  },
  {
    id: 64,
    name: 'sly-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    colors: []
  }
];

const property_wildcards = [
  {
    id: 65,
    name: 'property_wildcard',
    value: 4,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['dark-blue', 'green']
  },
  {
    id: 66,
    name: 'property_wildcard',
    value: 1,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['light-blue', 'brown']
  },
  {
    id: 67,
    name: 'property_wildcard',
    value: 2,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['orange', 'purple']
  },
  {
    id: 68,
    name: 'property_wildcard',
    value: 2,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['orange', 'purple']
  },
  {
    id: 69,
    name: 'property_wildcard',
    value: 4,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['green', 'railroad']
  },
  {
    id: 70,
    name: 'property_wildcard',
    value: 4,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['light-blue', 'railroad']
  },
  {
    id: 71,
    name: 'property_wildcard',
    value: 2,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['utility', 'railroad']
  },
  {
    id: 72,
    name: 'property_wildcard',
    value: 3,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['yellow', 'red']
  },
  {
    id: 73,
    name: 'property_wildcard',
    value: 3,
    type: 'property_wildcard',
    mainColor: '',
    colors: ['yellow', 'red']
  },
  {
    id: 74,
    name: 'property_wildcard',
    value: 0,
    type: 'property_wildcard',
    mainColor: '',
    colors: [
      'red',
      'green',
      'dark-blue',
      'light-blue',
      'utility',
      'yellow',
      'orange',
      'brown',
      'purple',
      'railroad'
    ]
  },
  {
    id: 75,
    name: 'property_wildcard',
    value: 0,
    type: 'property_wildcard',
    mainColor: '',
    colors: [
      'red',
      'green',
      'dark-blue',
      'light-blue',
      'utility',
      'yellow',
      'orange',
      'brown',
      'purple',
      'railroad'
    ]
  }
];

const rent_cards = [
  {
    id: 76,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['green', 'dark-blue']
  },
  {
    id: 77,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['green', 'dark-blue']
  },
  {
    id: 78,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['brown', 'light-blue']
  },
  {
    id: 79,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['brown', 'light-blue']
  },
  {
    id: 80,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['purple', 'orange']
  },
  {
    id: 81,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['purple', 'orange']
  },
  {
    id: 82,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['railroad', 'utility']
  },
  {
    id: 83,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['railroad', 'utility']
  },
  {
    id: 84,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['red', 'yellow']
  },
  {
    id: 85,
    name: 'rent',
    value: 1,
    type: 'rent',
    mainColor: '',
    colors: ['red', 'yellow']
  }
];

const rent_wildcards = [
  {
    id: 86,
    name: 'rent',
    value: 3,
    type: 'rent_wildcard',
    mainColor: '',
    colors: [
      'red',
      'green',
      'dark-blue',
      'light-blue',
      'utility',
      'yellow',
      'orange',
      'brown',
      'purple',
      'railroad'
    ]
  },
  {
    id: 87,
    name: 'rent',
    value: 3,
    type: 'rent_wildcard',
    mainColor: '',
    colors: [
      'red',
      'green',
      'dark-blue',
      'light-blue',
      'utility',
      'yellow',
      'orange',
      'brown',
      'purple',
      'railroad'
    ]
  },
  {
    id: 88,
    name: 'rent',
    value: 3,
    type: 'rent_wildcard',
    mainColor: '',
    colors: [
      'red',
      'green',
      'dark-blue',
      'light-blue',
      'utility',
      'yellow',
      'orange',
      'brown',
      'purple',
      'railroad'
    ]
  }
];

const money_cards = [
  {
    id: 89,
    name: 'money',
    value: 1,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 90,
    name: 'money',
    value: 1,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 91,
    name: 'money',
    value: 1,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 92,
    name: 'money',
    value: 1,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 93,
    name: 'money',
    value: 1,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 94,
    name: 'money',
    value: 1,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 95,
    name: 'money',
    value: 2,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 96,
    name: 'money',
    value: 2,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 97,
    name: 'money',
    value: 2,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 98,
    name: 'money',
    value: 2,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 99,
    name: 'money',
    value: 2,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 100,
    name: 'money',
    value: 3,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 101,
    name: 'money',
    value: 3,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 102,
    name: 'money',
    value: 3,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 103,
    name: 'money',
    value: 4,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 104,
    name: 'money',
    value: 4,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 105,
    name: 'money',
    value: 4,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 106,
    name: 'money',
    value: 5,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 107,
    name: 'money',
    value: 5,
    type: 'money',
    mainColor: '',
    colors: []
  },
  {
    id: 108,
    name: 'money',
    value: 10,
    type: 'money',
    mainColor: '',
    colors: []
  }
];

export default [
  ...property_cards,
  ...property_wildcards,
  ...action_cards,
  ...rent_cards,
  ...rent_wildcards,
  ...money_cards
];
