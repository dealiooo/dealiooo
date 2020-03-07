import React, { useState } from 'react';

import { FormGroup, Input } from '../../../components';
import { MainLobbyAPI } from '../../../services';
import { useInputValue, isBlank } from '../../../utils';
import * as S from './style';

const ROOM_CAPACITIES = [2, 3, 4];

const CreateRoom: React.FC = props => {
  const name = useInputValue('');
  const [capacity, setCapacity] = useState(2);
  const handleTabClick = event => {
    const capacity = parseInt(event.currentTarget.value, 10);
    setCapacity(capacity);
  };
  const handleCreateRoom = event => {
    event.preventDefault();
    MainLobbyAPI.postCreateGame(name.value, capacity);
  };

  return (
    <div>
      <form onSubmit={handleCreateRoom}>
        <FormGroup label="Name">
          <Input type="text" {...name} />
        </FormGroup>
        <FormGroup label="Number of Players">
          <S.RoomCapacities>
            {ROOM_CAPACITIES.map(roomCapacity => (
              <S.RoomCapacityInput
                key={roomCapacity}
                type="button"
                value={roomCapacity}
                active={roomCapacity === capacity}
                onClick={handleTabClick}
              ></S.RoomCapacityInput>
            ))}
          </S.RoomCapacities>
        </FormGroup>
        <S.CreateRoomButton onClick={handleCreateRoom} disabled={isBlank(name.value)}>
          Create Room
        </S.CreateRoomButton>
      </form>
    </div>
  );
};

export default CreateRoom;
