import React, { Component } from 'react';

class Hoverable extends Component {
  constructor() {
    super();
    this.state = {
      isMouseInside: false
    };
  }

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };

  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  render() {
    return this.props.children(
      this.state.isMouseInside,
      this.mouseEnter,
      this.mouseLeave
    );
  }
}

class PlayerListNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      playerInfos,
      selectedPlayerId,
      onPlayerHover,
      onPlayerClick
    } = this.props;

    return (
      <div className="columns">
        {playerInfos.map(playerInfo => (
          <Hoverable>
            {(isMouseInside, mouseEnter, mouseLeave) => {
              if (isMouseInside) {
                onPlayerHover(playerInfo.id);
              }
              return (
                <div className="column">
                  <button
                    id={playerInfo.id}
                    className={`button is-fullwidth has-text-centered ${
                      playerInfo.id == selectedPlayerId ? 'is-primary' : ''
                    }`}
                    onClick={onPlayerClick}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                  >
                    {playerInfo.id}
                  </button>
                </div>
              );
            }}
          </Hoverable>
        ))}
      </div>
    );
  }
}

export default PlayerListNavigationBar;
