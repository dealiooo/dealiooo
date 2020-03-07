export type Auth = {
  id: number;
  username: string;
  email: string;
  // Only exists in Game/GameLobby pages
  host?: boolean;
};

export type RentValue = {
  rentValues: number[];
  maxSetSize: number;
};

export enum GameStatus {
  'open' = 'open',
  'running' = 'running',
  'started' = 'started',
  'ended' = 'ended',
}

export enum RoomStatus {
  // user can join the room
  'join' = 'join',
  // user can rejoin a game in progress
  'enter' = 'enter',
  // use cannot enter a full room
  'full' = 'full',
  // user is not logged in
  'unauthorized' = 'unauthorized',
}

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

type CardColors =
  | 'red'
  | 'green'
  | 'dark-blue'
  | 'light-blue'
  | 'yellow'
  | 'orange'
  | 'brown'
  | 'purple'
  | 'utility'
  | 'railroad';

export type CardType = 'money' | 'property' | 'action' | 'building' | 'rent' | 'rent_wildcard' | 'property_wildcard';

export interface Card {
  id: number;
  name: string;
  value: number;
  type: CardType;
  mainColor: CardColors | '';
  colors: CardColors[];
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
  options: number[] | string[] | undefined;
}

export interface GameData {
  globals: GameGlobals | undefined;
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
