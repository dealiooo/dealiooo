import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { VipCrown as CrownIcon } from 'styled-icons/remix-line/VipCrown';
import { Users as UsersIcon } from 'styled-icons/fa-solid/Users';
import { ArrowRight as ArrowRightIcon } from 'styled-icons/feather/ArrowRight';

import RoomButton from './room-button.module.css';

import { Rooms, Room, Column, PlayersSize, GameStatusPill, HostUsername } from './style';
import { Link, CenterInline, IconWrapper, Button } from '../../../atoms';
import { Room as RoomType, RoomStatus } from '../../../../types/dealiooo';
import { GameLobbyAPI, history } from '../../../../services';
import { useTheme } from '../../../../styles';

type Props = {
  rooms: RoomType[];
};

export default function({ rooms }: Props) {
  const theme = useTheme();

  return (
    <Scrollbar>
      <Rooms>
        {rooms.map(room => {
          // @ts-ignore
          const hostUsername = room.players.find(player => player.host).User.username;
          const linkHref = (function() {
            if (room.roomStatus === RoomStatus.full) {
              return null;
            }

            if (room.roomStatus === RoomStatus.unauthorized) {
              return '/sign-up';
            }

            return `/game-lobby/${room.id}`;
          })();

          const handleRoomLinkClick = event => {
            event.preventDefault();

            if (room.roomStatus === RoomStatus.join) {
              GameLobbyAPI.postJoin(room.id);
              // Main Lobby socket will trigger location push to /game-lobby
              return;
            }

            history.push(linkHref);
          };

          return (
            <Room key={room.id}>
              <Column>
                <div>{room.name}</div>
                <div>
                  <CrownIcon size={20} color={theme.gold} />
                  <HostUsername>{hostUsername}</HostUsername>
                </div>
              </Column>
              <Column>
                <div>Players</div>
                <div>
                  <IconWrapper>
                    <UsersIcon size={20} />
                  </IconWrapper>
                  <PlayersSize>{`${room.players.length}/${room.capacity}`}</PlayersSize>
                </div>
              </Column>
              <Column>
                <div>Status</div>
                <GameStatusPill status={room.gameStatus}>{room.gameStatus}</GameStatusPill>
              </Column>
              <Column>
                <Button
                  outline
                  className={RoomButton.room_button}
                  as={linkHref ? Link : undefined}
                  to={linkHref ? linkHref : undefined}
                  onClick={linkHref && handleRoomLinkClick}
                  disabled={!linkHref}
                >
                  <CenterInline left>
                    {room.roomStatus === RoomStatus.unauthorized ? 'Play' : room.roomStatus}
                  </CenterInline>
                  {linkHref && <ArrowRightIcon size={20} />}
                </Button>
              </Column>
            </Room>
          );
        })}
      </Rooms>
    </Scrollbar>
  );
}
