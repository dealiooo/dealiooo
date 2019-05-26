import React, { Component } from 'react';

import Hoverable from '../../../components/Hover/hoverable';

import PlayerHandOrPromptView from './PlayerHandOrPromptView';
import GameChat from './GameChat';
import GameLog from './GameLog';

class PlayerPlayArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSideMenuItemIndex: 0,
      hoverSideMenuIndex: null
    };

    this.handleSideMenuItemClick = this.handleSideMenuItemClick.bind(this);
    this.handleSideMenuItemHoverEnter = this.handleSideMenuItemHoverEnter.bind(
      this
    );
    this.handleSideMenuItemHoverExit = this.handleSideMenuItemHoverExit.bind(
      this
    );
  }

  handleSideMenuItemClick(event) {
    this.setState({
      activeSideMenuItemIndex: parseInt(event.target.getAttribute('value'))
    });
  }

  handleSideMenuItemHoverEnter({ data }) {
    if (this.state.activeSideMenuItemIndex !== data.hoverSideMenuIndex) {
      this.setState({
        hoverSideMenuIndex: data.hoverSideMenuIndex
      });
    }
  }

  handleSideMenuItemHoverExit({ data }) {
    this.setState({
      hoverSideMenuIndex: null
    });
  }

  /// Calculates which menu item index to render based on current active clicked or hover states
  getActiveIndex() {
    const { activeSideMenuItemIndex, hoverSideMenuIndex } = this.state;

    const isActiveClickedIndex1 =
      activeSideMenuItemIndex === 0 && null === hoverSideMenuIndex;
    if (isActiveClickedIndex1 || hoverSideMenuIndex === 0) {
      return 0;
    }

    const isActiveClickedIndex2 =
      activeSideMenuItemIndex === 1 && null === hoverSideMenuIndex;
    if (isActiveClickedIndex2 || hoverSideMenuIndex === 1) {
      return 1;
    }

    const isActiveClickedIndex3 =
      activeSideMenuItemIndex === 2 && null === hoverSideMenuIndex;
    if (isActiveClickedIndex3 || hoverSideMenuIndex === 2) {
      return 2;
    }
  }

  render() {
    const {
      gameId,
      userId,
      promptsInfo,
      gameLog,
      handCards,
      onHandCardClicked,
      onCancelClicked,
      onEndTurn,
      onForfeit,
      contentHeight,
      onPromptOptionClicked,
      log
    } = this.props;
    const { activeSideMenuItemIndex } = this.state;

    const isPendingUserInput =
      undefined !== promptsInfo.options &&
      userId === promptsInfo.promptPlayerId;

    let selectedBottomView;
    const activeIndex = this.getActiveIndex();

    if (activeIndex === 0) {
      selectedBottomView = (
        <PlayerHandOrPromptView
          isPendingUserInput={isPendingUserInput}
          handCards={handCards}
          promptsInfo={promptsInfo}
          onHandCardClicked={onHandCardClicked}
          onCancelClicked={onCancelClicked}
          onPromptOptionClicked={onPromptOptionClicked}
          onEndTurn={onEndTurn}
          onForfeit={onForfeit}
          contentHeight={contentHeight}
        />
      );
    } else if (activeIndex === 1) {
      selectedBottomView = (
        <GameChat gameId={gameId} contentHeight={contentHeight} log={log} />
      );
    } else if (activeIndex === 2) {
      selectedBottomView = (
        <GameLog gameLog={gameLog} contentHeight={contentHeight} />
      );
    }

    return (
      <div className="columns is-marginless">
        <div className="column is-1">
          <aside className="menu">
            <ul className="menu-list">
              {[0, 1, 2].map(i => {
                return (
                  <li
                    key={i}
                    className={activeSideMenuItemIndex === i ? 'is-active' : ''}
                    style={{ paddingTop: `${i !== 0 ? '2px' : ''}` }}
                  >
                    <Hoverable
                      data={{ hoverSideMenuIndex: i }}
                      onEnter={this.handleSideMenuItemHoverEnter}
                      onExit={this.handleSideMenuItemHoverExit}
                    >
                      <button
                        className={`button is-fullwidth is-radiusless ${
                          activeSideMenuItemIndex === i
                            ? 'has-background-black'
                            : ''
                        }`}
                        value={i}
                        onClick={this.handleSideMenuItemClick}
                      >
                        <span onClick={this.handleSideMenuItemClick} value={i}>
                          <i
                            className={`is-fullwidth fa ${
                              {
                                0: 'fa-layer-group',
                                1: 'fa-comment-alt',
                                2: 'fa-scroll'
                              }[i]
                            } ${
                              activeSideMenuItemIndex === i
                                ? 'has-text-primary'
                                : ''
                            }`}
                            onClick={this.handleSideMenuItemClick}
                            value={i}
                          />
                        </span>
                      </button>
                    </Hoverable>
                  </li>
                );
              })}

              <div
                style={{
                  // 12: column padding, 36: button height, 2: padding vertical of buttons
                  minHeight: contentHeight - 12 * 2 - 36 * 4 - 2 * 2,
                  maxHeight: contentHeight - 12 * 2 - 36 * 4 - 2 * 2
                }}
              />
              <button
                className="button is-rounded is-danger has-text-right is-fullwidth"
                onClick={onForfeit}
              >
                Forfeit
              </button>
            </ul>
          </aside>
        </div>
        <div className="column is-11">{selectedBottomView}</div>
      </div>
    );
  }
}

export default PlayerPlayArea;
