# dealiooo
dealiooo is a multiplayer card game where players collect properties and money, steal cards from other players, charge people rent, swap cards, counter other peoples cards, and much more!',

## Technology:
built with react, node, express, sockets, typescript, and postgresql with sequelize

## Winning Condition:

Formulate three different colored property sets to win the game.

## Game Setup:

Each player receives 5 cards faced down when the game starts.

## Game Play:

At each player’s turn:

- Draw 5 cards if you have no cards at hand, else draw 2 cards. If the draw pile runs out, shuffle the discard pile. This is the new draw pile.
- Play up to 3 cards.
- Discard extra cards if you have more than 7 cards at hand to the center until you have 7 cards at hand.

### Cards:

There are 110 playable cards in a deck.
All cards beside rule cards and multi-colored wildcards have a monetary value specified either in the middle or on the corner of the cards.

#### Types of cards:

1. Money cards
   There are 20 money cards.
   When played, place the cards in your bank pile.
   Types of money cards followed by their counts:

   - $1 card: 6
   - $2 card: 5
   - $3 card: 3
   - $4 card: 3
   - $5 card: 2
   - $10 card: 1

2. Property cards
   There are 28 property cards.
   When played, place the cards in your property collection.
   Each property card shows the amount of same colored card needed to complete the set.
   Sets of property cards followed by their monetary values:

   - Green Set: 4M
     - North Carolina Avenue
     - Pacific Avenue
     - Pennsylvania Avenue
   - Dark Blue Set: 4M
     - Broadwalk
     - Park Place
   - Light Blue Set: 1M
     - Connecticut Avenue
     - Oriental Avenue
     - Vermont Avenue
   - Red Set: 3M
     - Kentucky Avenue
     - Indiana Avenue
     - Illinois Avenue
   - Utility Set: 2M
     - Water Works
     - Electric Company
   - Yellow Set: 3M
     - Ventnor Avenue
     - Marvin Gardens
     - Atlantic Avenue
   - Orange Set: 2M
     - New York Avenue
     - St. James Place
     - Tennessee Avenue
   - Brown Set: 1M
     - Baltic Avenue
     - Mediterranean Avenue
   - Pink Set: 2M
     - St. Charles Avenue
     - Virginia Avenue
     - States Avenue
   - Railroad Set: 2M
     - Short Line
     - B. & O. Railroad
     - Reading Railroad
     - Pennsylvania Railroad

3. Property Wildcards
   There are 11 property wildcards.
   When played, place the cards in your property collection.
   Property wildcards can be used as substitutes for property cards of the colors on the wildcard.
   Property sets consist of only wildcards are not valid.
   Wildcards can be swap around during the player turn.
   Types of property wildcards followed by their counts followed by their monetary values:

   - Pink and Orange: 2: 2M
   - Light Blue and Brown: 1: 1M
   - Light Blue and Railroad: 1: 4M
   - Dark Blue and Green: 1: 4M
   - Railroad and Green: 1: 4M
   - Red and Yellow: 2: 3M
   - Utility and Railroad: 1: 2M
   - Multi-colored: 2
     Multi-colored wildcards have no monetary value

4. Action Cards
   There are 47 action cards.
   When played, place the cards either in the center or in your bank.
   Place the card in the center if you want to execute the action.
   Place the card in your bank if you want to play the action card as a money card.
   Types of action cards followed by their counts:
   - Deal Breaker: 2:
     Action: Steal a complete set of properties from any player including the buildings.
     Monetary value: 5M
   - Debt Collector: 3
     Action: Force any player to pay you 5M. See the payment mechanism.
     Monetary value: 3M
   - Double The Rent!: 2
     Action: Needs to be played with a Rent Action Card.
     Monetary value: 1M
   - Forced Deal: 4
     Action: Swap any property that is not a part of a full set with another player.
     Monetary Value: 3M
   - Hotel: 3
     Action: Add onto any full set (except railroads and utilities) with a house you own to add 4M to the rent value.
     Monetary Value: 4M
   - House: 3
     Action: Add onto any full set (except railroads and utilities) you own to add 3M to the rent value.
     Monetary Value: 3M
   - It’s My Birthday: 3
     Action: All players give you 2M as a “gift”. See the payment mechanism.
     Monetary Value: 2M
   - Just Say No!: 3
     Action: Can be played any time when an action card is played against you to nullify the effect of the action card.
     Monetary Value: 4M
   - Pass Go: 10
     Action: Draw 2 extra cards.
     Monetary Value: 1M
   - Sly Deal: 3
     Action: Steal a property that is not part of a full set.
     Monetary Value: 3M
   - Rent: 13
     Action: Force a player to pay you rent from the property you own in one of the available rent colors.
     Monetary Value: vary
     Types of rent action cards followed by their counts followed by their monetary values:
     - Pink and Orange: 2: 1M
     - Railroad and Utility: 2: 1M
     - Green and Dark Blue: 2: 1M
     - Brown and Light Blue: 2: 1M
     - Red and Yellow: 2: 1M
     - Multi-colored: 3: 3M

### Payment Mechanism:

Players cannot pay with their hand cards.
Multi-colored wildcards cannot be used as a payment.
No change is given.
If a player cannot afford to pay, the player only needs to pay as much as the player could afford.
If a player has only multi-colored wildcards or none on the player field, then the player doesn’t need to pay.
A player may pay by any combination of cash, properties, or both.
Payments stay on the table. If a player pays with properties, those properties go into the payee property section
