export type RentValue = {
  rentValues: number[];
  maxSetSize: number;
};

export enum GameStatus {
  'open' = 'open',
  'running' = 'running',
  // TODO: remove redundancy on the backend: there should just be 'running' state
  'started' = 'started',
  'ended' = 'ended',
}

export enum RoomStatus {
  // user can join the room
  'join' = 'join',
  // user can rejoin a game in progress
  'enter' = 'enter',
  // room is full
  'full' = 'full',
  // user is not logged in
  'unauthorized' = 'unauthorized',
}

export type Auth = {
  id: number;
  username: string;
  email: string;
  // Only exists in Game/GameLobby pages
  host?: boolean;
};

export type MessageData = {
  username: string;
  message: string;
};

export interface Room {
  id: number;
  name: string;
  gameStatus: GameStatus;
  roomStatus: RoomStatus;
  capacity: number;
  players: Player[];
}

export enum CardColor {
  'red' = 'red',
  'green' = 'green',
  'dark-blue' = 'dark-blue',
  'light-blue' = 'light-blue',
  'yellow' = 'yellow',
  'orange' = 'orange',
  'brown' = 'brown',
  'purple' = 'purple',
  'utility' = 'utility', // lightGreen
  'railroad' = 'railroad', // black
}

export type CardType = 'money' | 'property' | 'action' | 'building' | 'rent' | 'rent_wildcard' | 'property_wildcard';

export interface Card {
  id: number;
  name: string;
  value: number;
  type: CardType;
  mainColor: CardColor;
  colors: CardColor[];
}

export interface PlayerStatus {
  id: number;
  username: string;
  ready: boolean;
  host: boolean;
}

export interface Player {
  id: number;
  username: string;
  handCards: Card[] | number;
  actionCards: Card[];
  propertyCards: Card[];
  bankCards: Card[];
  buildingCards: Card[];
}

export interface GameGlobals {
  winner?: string;
  turnCount: number;
  currentPlayerId: number;
  currentPlayerUsername: string;
  currentPlayerIndex: number;
  cardsPlayed: number;
  deckCount: number;
  discard: Card[];
  tick: number;
}

export interface PromptsInfo {
  promptPlayerId?: number;
  promptPlayerUsername?: string;
  promptMessage?: string;
  options: number[] | string[];
}

export interface GameData {
  gameGlobals: GameGlobals;
  players: Player[];
  promptsInfo: PromptsInfo;
}

export interface Pending {
  eventName: string;
  message: string;
  arguments: {
    cancelled?: boolean;
    forced?: boolean;
    payees?: Player[];
    payeesDebts?: number[];
    pendingPlayer: Player;
    player?: Player;
    userInput?: number;
    userInputOptions?: string[];
  };
}

export enum EventMessage {
  'do you want to move a card around?' = 'do you want to move a card around?',
  'do you want to play a hand card?' = 'do you want to play a hand card?',
  'do you want to play just say no?' = 'do you want to play just say no?',
  'picking a color' = 'picking a color',
  'picking a destination' = 'picking a destination',
  'picking a hand card' = 'picking a hand card',
  'picking a hand card to discard' = 'picking a hand card to discard',
  'picking a field card' = 'picking a field card',
  'picking a field pile' = 'picking a field pile',
  'picking a property set to rent' = 'picking a property set to rent',
  'picking a target player' = 'picking a target player',
  'play as money or action?' = 'play as money or action?',
  'play as money or property?' = 'play as money or property?',
  'selecting a property set' = 'selecting a property set',
  'waiting for player action' = 'waiting for player action',
}

// @v2 typings
// export interface GameData {
//   turnCount: number;
//   cardsPlayed: number;
//   cardsPlayedList: Card[];
//   deck: Card[];
//   discard: Card[];
//   playerCount: number;
//   players: Player[];
//   currentPlayerIndex: number;
//   currentPlayer: Player;
//   pendingForUserInput?: Pending;
//   userInput?: number;
//   winner?: Player;
//   ticks: number[];
// }
