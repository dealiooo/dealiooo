import isNil from 'lodash/isNil';

import { EventMessage } from '../../../../types/dealiooo';

const getDataTypeValue = (event, attributeName, defaultValue) => {
  let attributeValue = event.currentTarget.dataset[attributeName];
  if (!isNil(attributeValue)) {
    return attributeValue;
  }
  return defaultValue;
};

const handleCardId = event => getDataTypeValue(event, 'cardId', -1);
const handleOptionIndex = event => getDataTypeValue(event, 'optionIndex', -1);

const UserInputMap: { [key in EventMessage]: (event) => any | '-1' } = {
  [EventMessage['picking a hand card']]: handleCardId,
  [EventMessage['picking a hand card to discard']]: handleCardId,
  [EventMessage['picking a field card']]: handleCardId,
  [EventMessage['picking a target player']]: handleOptionIndex,
  [EventMessage['picking a color']]: handleOptionIndex,
  [EventMessage['do you want to play a hand card?']]: handleOptionIndex,
  [EventMessage['do you want to move a card around?']]: handleOptionIndex,
  [EventMessage['do you want to play just say no?']]: handleOptionIndex,
  [EventMessage['play as money or action?']]: handleOptionIndex,
  [EventMessage['play as money or property?']]: handleOptionIndex,
  [EventMessage['picking a field pile']]: handleOptionIndex,
  [EventMessage['picking a property set to rent']]: handleOptionIndex,
  [EventMessage['picking a destination']]: handleOptionIndex,
  [EventMessage['picking a property set to rent']]: handleOptionIndex,
  [EventMessage['picking a destination']]: handleOptionIndex,
  [EventMessage['selecting a property set']]: handleOptionIndex,
  [EventMessage['picking a destination']]: handleOptionIndex,
  [EventMessage['waiting for player action']]: handleOptionIndex,
};

export default UserInputMap;
