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
                  className={`button is-fullwidth has-text-centered global-light-hover ${
                    selectedPlayerId === playerInfo.id
                      ? 'has-background-light'
                      : ''
                  }`}
                  style={{
                    height: `100%`,
                    borderLeft: `${
                      selectedPlayerId === playerInfo.id
                        ? '6px solid #209cee'
                        : ''
                    }`
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
