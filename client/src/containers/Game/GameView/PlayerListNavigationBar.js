import React, { Component } from 'react';

import Hoverable from '../../../components/Hover/hoverable';

class PlayerListNavigationBar extends Component {
  render() {
    const {
      playerInfos,
      selectedPlayerId,
      onPlayerClick,
      onPlayerHover
    } = this.props;

    return (
      <aside className="menu">
        <ul className="menu-list">
          {playerInfos.map(playerInfo => (
            <li
              key={playerInfo.id}
              className={`${
                selectedPlayerId === playerInfo.id ? 'is-active' : ''
              }`}
            >
              <Hoverable
                data={{ hoverPlayerId: playerInfo.id }}
                onEnter={onPlayerHover}
              >
                <button
                  className={`button is-fullwidth has-text-centered ${
                    playerInfo.id === selectedPlayerId ? 'is-primary' : ''
                  }`}
                  value={playerInfo.id}
                  onClick={onPlayerClick}
                >
                  {playerInfo.id}
                </button>
              </Hoverable>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}

export default PlayerListNavigationBar;
