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
 *    subColor: [String]
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
    subColor: []
  },
  {
    id: 2,
    name: 'mediterranean-avenue',
    value: 1,
    type: 'property',
    mainColor: 'brown',
    subColor: []
  },
  {
    id: 3,
    name: 'boardwalk',
    value: 4,
    type: 'property',
    mainColor: 'dark-blue',
    subColor: []
  },
  {
    id: 4,
    name: 'park-place',
    value: 4,
    type: 'property',
    mainColor: 'dark-blue',
    subColor: []
  },
  {
    id: 5,
    name: 'north-carolina-avenue',
    value: 4,
    type: 'property',
    mainColor: 'green',
    subColor: []
  },
  {
    id: 6,
    name: 'pacific-avenue',
    value: 4,
    type: 'property',
    mainColor: 'green',
    subColor: []
  },
  {
    id: 7,
    name: 'pennsylvania-avenue',
    value: 4,
    type: 'property',
    mainColor: 'green',
    subColor: []
  },
  {
    id: 8,
    name: 'connecticut-avenue',
    value: 1,
    type: 'property',
    mainColor: 'light-blue',
    subColor: []
  },
  {
    id: 9,
    name: 'oriental-avenue',
    value: 1,
    type: 'property',
    mainColor: 'light-blue',
    subColor: []
  },
  {
    id: 10,
    name: 'vermont-avenue',
    value: 1,
    type: 'property',
    mainColor: 'light-blue',
    subColor: []
  },
  {
    id: 11,
    name: 'new-york-avenue',
    value: 2,
    type: 'property',
    mainColor: 'orange',
    subColor: []
  },
  {
    id: 12,
    name: 'st.james-place',
    value: 2,
    type: 'property',
    mainColor: 'orange',
    subColor: []
  },
  {
    id: 13,
    name: 'tennessee',
    value: 2,
    type: 'property',
    mainColor: 'orange',
    subColor: []
  },
  {
    id: 14,
    name: 'st.charles-place',
    value: 2,
    type: 'property',
    mainColor: 'purple',
    subColor: []
  },
  {
    id: 15,
    name: 'virginia-avenue',
    value: 2,
    type: 'property',
    mainColor: 'purple',
    subColor: []
  },
  {
    id: 16,
    name: 'states-avenue',
    value: 2,
    type: 'property',
    mainColor: 'purple',
    subColor: []
  },
  {
    id: 17,
    name: 'short-line',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    subColor: []
  },
  {
    id: 18,
    name: 'b.-&-o.-railroad',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    subColor: []
  },
  {
    id: 19,
    name: 'reading-railroad',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    subColor: []
  },
  {
    id: 20,
    name: 'pennsylvania-railroad',
    value: 2,
    type: 'property',
    mainColor: 'railroad',
    subColor: []
  },
  {
    id: 21,
    name: 'kentucky-avenue',
    value: 3,
    type: 'property',
    mainColor: 'red',
    subColor: []
  },
  {
    id: 22,
    name: 'indiana-avenue',
    value: 3,
    type: 'property',
    mainColor: 'red',
    subColor: []
  },
  {
    id: 23,
    name: 'illinois-avenue',
    value: 3,
    type: 'property',
    mainColor: 'red',
    subColor: []
  },
  {
    id: 24,
    name: 'water-works',
    value: 2,
    type: 'property',
    mainColor: 'utility',
    subColor: []
  },
  {
    id: 25,
    name: 'electric-company',
    value: 2,
    type: 'property',
    mainColor: 'utility',
    subColor: []
  },
  {
    id: 26,
    name: 'ventnor-avenue',
    value: 3,
    type: 'property',
    mainColor: 'yellow',
    subColor: []
  },
  {
    id: 27,
    name: 'marvin-gardens',
    value: 3,
    type: 'property',
    mainColor: 'yellow',
    subColor: []
  },
  {
    id: 28,
    name: 'atlantic-avenue',
    value: 3,
    type: 'property',
    mainColor: 'yellow',
    subColor: []
  }
];

const action_cards = [
  {
    id: 29,
    name: 'deal-breaker',
    value: 5,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 30,
    name: 'deal-breaker',
    value: 5,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 31,
    name: 'debt-collector',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 32,
    name: 'debt-collector',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 33,
    name: 'debt-collector',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 34,
    name: 'double-the-rent',
    value: 0,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 35,
    name: 'double-the-rent',
    value: 0,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 36,
    name: 'force-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 37,
    name: 'force-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 38,
    name: 'force-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 39,
    name: 'force-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 40,
    name: 'hotel',
    value: 4,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 41,
    name: 'hotel',
    value: 4,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 42,
    name: 'hotel',
    value: 4,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 43,
    name: 'house',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 44,
    name: 'house',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 45,
    name: 'house',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 46,
    name: 'its-my-birthday',
    value: 2,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 47,
    name: 'its-my-birthday',
    value: 2,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 48,
    name: 'its-my-birthday',
    value: 2,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 49,
    name: 'just-say-no',
    value: 4,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 50,
    name: 'just-say-no',
    value: 4,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 51,
    name: 'just-say-no',
    value: 4,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 52,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 53,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 54,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 55,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 56,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 57,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 58,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 59,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 60,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 61,
    name: 'pass-go',
    value: 1,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 62,
    name: 'sly-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 63,
    name: 'sly-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  },
  {
    id: 64,
    name: 'sly-deal',
    value: 3,
    type: 'action',
    mainColor: '',
    subColor: []
  }
];

const property_wildcards = [
  {
    id: 65,
    name: '',
    value: 4,
    type: 'property-wildcard',
    mainColor: 'dark-blue',
    subColor: ['green']
  },
  {
    id: 66,
    name: '',
    value: 1,
    type: 'property-wildcard',
    mainColor: 'light-blue',
    subColor: ['brown']
  },
  {
    id: 67,
    name: '',
    value: 2,
    type: 'property-wildcard',
    mainColor: 'orange',
    subColor: ['purple']
  },
  {
    id: 68,
    name: '',
    value: 2,
    type: 'property-wildcard',
    mainColor: 'orange',
    subColor: ['purple']
  },
  {
    id: 69,
    name: '',
    value: 4,
    type: 'property-wildcard',
    mainColor: 'green',
    subColor: ['railroad']
  },
  {
    id: 70,
    name: '',
    value: 4,
    type: 'property',
    mainColor: 'light-blue',
    subColor: ['railroad']
  },
  {
    id: 71,
    name: 'atlantic-avenue',
    value: 2,
    type: 'property',
    mainColor: 'utility',
    subColor: ['railroad']
  },
  {
    id: 72,
    name: 'atlantic-avenue',
    value: 3,
    type: 'property-wildcard',
    mainColor: 'yellow',
    subColor: ['red']
  },
  {
    id: 73,
    name: 'atlantic-avenue',
    value: 3,
    type: 'property-wildcard',
    mainColor: 'yellow',
    subColor: ['red']
  },
  {
    id: 74,
    name: 'atlantic-avenue',
    value: 0,
    type: 'property-wildcard',
    mainColor: 'red',
    subColor: [
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
    name: 'atlantic-avenue',
    value: 0,
    type: 'property-wildcard',
    mainColor: 'red',
    subColor: [
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
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'green',
    subColor: ['dark-blue']
  },
  {
    id: 77,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'green',
    subColor: ['dark-blue']
  },
  {
    id: 78,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'brown',
    subColor: ['light-blue']
  },
  {
    id: 79,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'brown',
    subColor: ['light-blue']
  },
  {
    id: 80,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'purple',
    subColor: ['orange']
  },
  {
    id: 81,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'purple',
    subColor: ['orange']
  },
  {
    id: 82,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'railroad',
    subColor: ['utility']
  },
  {
    id: 83,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'railroad',
    subColor: ['utility']
  },
  {
    id: 84,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'red',
    subColor: ['yellow']
  },
  {
    id: 85,
    name: '',
    value: 1,
    type: 'rent',
    mainColor: 'red',
    subColor: ['yellow']
  },
  {
    id: 86,
    name: '',
    value: 3,
    type: 'rent',
    mainColor: 'red',
    subColor: [
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
    name: '',
    value: 3,
    type: 'rent',
    mainColor: 'red',
    subColor: [
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
    name: '',
    value: 3,
    type: 'rent',
    mainColor: 'red',
    subColor: [
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
    name: '',
    value: 1,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 90,
    name: '',
    value: 1,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 91,
    name: '',
    value: 1,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 92,
    name: '',
    value: 1,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 93,
    name: '',
    value: 1,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 94,
    name: '',
    value: 1,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 95,
    name: '',
    value: 2,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 96,
    name: '',
    value: 2,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 97,
    name: '',
    value: 2,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 98,
    name: '',
    value: 2,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 99,
    name: '',
    value: 2,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 100,
    name: '',
    value: 3,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 101,
    name: '',
    value: 3,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 102,
    name: '',
    value: 3,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 103,
    name: '',
    value: 4,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 104,
    name: '',
    value: 4,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 105,
    name: '',
    value: 4,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 106,
    name: '',
    value: 5,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 107,
    name: '',
    value: 5,
    type: 'money',
    mainColor: '',
    subColor: []
  },
  {
    id: 108,
    name: '',
    value: 10,
    type: 'money',
    mainColor: '',
    subColor: []
  }
];

export default [
  ...property_cards,
  ...property_wildcards,
  ...action_cards,
  ...rent_cards,
  ...money_cards
];
