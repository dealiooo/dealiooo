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

    // 12: column padding,
    // 36: button height,
    // 2: padding vertical of buttons,
    // 6: container padding
    const fillHeight = contentHeight - 12 * 2 - 36 * 4 - 2 * 2 - 6 * 2;

    return (
      <div
        className="columns is-vcentered is-marginless"
        style={{
          height: `${contentHeight}px`,
          minHeight: `${contentHeight}px`,
          maxHeight: `${contentHeight}px`
        }}
      >
        <div className="column is-1">
          <aside className="menu">
            <ul className="menu-list box" style={{ padding: `6px` }}>
              {[0, 1, 2].map(tabIndex => {
                return (
                  <li
                    key={tabIndex}
                    className={
                      activeSideMenuItemIndex === tabIndex ? 'is-active' : ''
                    }
                    style={{ paddingTop: `${tabIndex !== 0 ? '2px' : '0px'}` }}
                  >
                    <Hoverable
                      data={{ hoverSideMenuIndex: tabIndex }}
                      onEnter={this.handleSideMenuItemHoverEnter}
                      onExit={this.handleSideMenuItemHoverExit}
                    >
                      <button
                        className={`button is-fullwidth global-dark-hover ${
                          activeSideMenuItemIndex === tabIndex
                            ? 'is-dark'
                            : 'has-background-light'
                        }`}
                        style={{
                          border: `none`
                        }}
                        value={tabIndex}
                        onClick={this.handleSideMenuItemClick}
                      >
                        <span
                          onClick={this.handleSideMenuItemClick}
                          value={tabIndex}
                        >
                          <i
                            className={`is-fullwidth fa ${
                              {
                                0: 'fa-layer-group',
                                1: 'fa-comment-alt',
                                2: 'fa-scroll'
                              }[tabIndex]
                            }`}
                            style={{
                              color: `${
                                activeSideMenuItemIndex === tabIndex
                                  ? `gold`
                                  : ''
                              }`
                            }}
                            onClick={this.handleSideMenuItemClick}
                            value={tabIndex}
                          />
                        </span>
                      </button>
                    </Hoverable>
                  </li>
                );
              })}
              <div
                style={{
                  minHeight: fillHeight,
                  maxHeight: fillHeight
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
