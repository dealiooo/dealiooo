import React from 'react';
import { VipCrown as CrownIcon } from 'styled-icons/remix-line/VipCrown';
import { ArrowRight as ArrowRightIcon } from 'styled-icons/feather/ArrowRight';

import * as S from './style';
import { CenterInline } from '../../../components';
import { Room, RoomStatus } from '../../../types';
import { GameLobbyAPI, history } from '../../../services';
import { useTheme } from '../../../utils';

type RoomsProps = {
  rooms: Room[];
};

const getHostUsername = (room: Room) => {
  if (room && room.players) {
    const host = room.players.find(player => player.host);

    if (host) {
      return host.User.username;
    }
  }

  return null;
};
const getRoomHref = (room: Room) => {
  if (room.roomStatus === RoomStatus.full) {
    return null;
  }

  if (room.roomStatus === RoomStatus.unauthorized) {
    return '/sign-up';
  }

  return `/game-lobby/${room.id}`;
};

const Rooms: React.FC<RoomsProps> = ({ rooms }) => {
  const theme = useTheme();

  return (
    <S.Rooms>
      {rooms.map(room => {
        const hostUsername = getHostUsername(room);
        const to = getRoomHref(room);

        const handleRoomLinkClick = event => {
          event.preventDefault();

          if (room.roomStatus === RoomStatus.join) {
            GameLobbyAPI.postJoin(room.id);
            // Main Lobby socket will trigger location push to /game-lobby
            return;
          }

          if (to) {
            history.push(to);
          }
        };

        return (
          <S.Room key={room.id}>
            <S.Column>
              <div>{room.name}</div>
              <div>
                <CrownIcon size={20} color={theme.palette.gold} />
                <CenterInline>{hostUsername}</CenterInline>
              </div>
            </S.Column>
            <S.Column>
              <div>Players</div>
              <div>{`${room.players.length}/${room.capacity}`}</div>
            </S.Column>
            <S.Column>
              <div>Status</div>
              <div>{room.gameStatus}</div>
            </S.Column>
            <S.Column>
              <S.RoomButton onClick={to ? handleRoomLinkClick : undefined} disabled={!to}>
                <CenterInline left>
                  {room.roomStatus === RoomStatus.unauthorized ? 'Play' : room.roomStatus}
                </CenterInline>
                {to && <ArrowRightIcon size={20} />}
              </S.RoomButton>
            </S.Column>
          </S.Room>
        );
      })}
    </S.Rooms>
  );
};

export default Rooms;
