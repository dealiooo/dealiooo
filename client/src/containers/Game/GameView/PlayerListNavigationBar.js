import React, { Component } from 'react';

import Hoverable from '../../../components/Hover/hoverable';

class PlayerListNavigationBar extends Component {
  render() {
    const {
      playerInfos,
      selectedPlayerId,
      onPlayerClick,
      onPlayerHover,
      contentHeight
    } = this.props;

    return (
      <aside
        className="menu"
        style={{
          // 4: marginBottoms
          height: `${contentHeight - playerInfos.length * 4 - 4}px`
        }}
      >
        <ul
          className="menu-list"
          style={{
            width: `100%`,
            height: `100%`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `stretch`
          }}
        >
          {playerInfos.map((playerInfo, i) => (
            <li
              key={playerInfo.id}
              className={`${
                selectedPlayerId === playerInfo.id ? 'is-active' : ''
              }`}
              key={playerInfo.id}
              style={{
                display: `flex`,
                flexGrow: `1`,
                flexDirection: `row`,
                justifyContent: `center`,
                alignItems: `center`,
                alignSelf: `stretch`,
                width: `100%`,
                height: `100%`,
                marginBottom: i === playerInfos.length - 1 ? `0px` : `4px`
              }}
            >
              <Hoverable
                data={{ hoverPlayerId: playerInfo.id }}
                onEnter={onPlayerHover}
                style={{
                  width: `100%`,
                  height: `100%`
                }}
              >
                <button
                  className={`button is-fullwidth has-text-centered global-dark-hover ${
                    selectedPlayerId === playerInfo.id
                      ? 'has-background-dark'
                      : ''
                  }`}
                  style={{
                    height: `100%`,
                    color: `${selectedPlayerId === playerInfo.id ? 'gold' : ''}`
                  }}
                  value={playerInfo.id}
                  onClick={onPlayerClick}
                >
                  {playerInfo.username}
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
