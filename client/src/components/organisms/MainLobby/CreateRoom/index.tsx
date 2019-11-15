import React, { useState } from 'react';
import styled from 'styled-components';

import { Input, Tabs, Button } from '../../../atoms';
import { FormGroup } from '../../../molecules';
import { InputClickEvent } from '../../../../types/html-events';
import { MainLobbyAPI } from '../../../../services';
import { useInputValue } from '../../../../utils';

const ROOM_CAPACITIES = [2, 3, 4];

export default function() {
  const name = useInputValue('');
  const [capacity, setCapacity] = useState(2);
  const onTabClick = (event: InputClickEvent) => {
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
        <FormGroup label="Room Name">
          <Input type="text" {...name} />
        </FormGroup>
        <FormGroup label="Number of Players">
          <Tabs.Tabs>
            {ROOM_CAPACITIES.map(roomCapacity => (
              <Tabs.Tab
                key={roomCapacity}
                as={Input}
                type="button"
                value={roomCapacity}
                active={roomCapacity === capacity}
                onClick={onTabClick}
              ></Tabs.Tab>
            ))}
          </Tabs.Tabs>
        </FormGroup>
        <CreateRoomButton secondary onClick={handleCreateRoom}>
          Create Room
        </CreateRoomButton>
      </form>
    </div>
  );
}

const CreateRoomButton = styled(Button)`
  margin: 0 auto;
`;
