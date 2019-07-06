import React, { Component } from 'react';

import '../styles/cardHover.css';

class PlayerHandView extends Component {
  state = {
    handCardsScrollLeftOffset: 0
  };

  handCardContainerRef = React.createRef();

  componentDidMount() {
    this.handCardContainerRef.current.addEventListener(
      'scroll',
      this.updateHorizontalScrollPosition
    );
  }

  componentWillUnmount() {
    this.handCardContainerRef.current.removeEventListener(
      'scroll',
      this.updateHorizontalScrollPosition
    );
  }

  updateHorizontalScrollPosition = e => {
    this.setState({
      handCardsScrollLeftOffset: e.srcElement.scrollLeft
    });
  };

  render() {
    const {
      handCards,
      onHandCardClicked,
      contentHeight: contentHeightProp,
      onCancelClicked,
      isPendingHandInput
    } = this.props;

    const { handCardsScrollLeftOffset } = this.state;

    // 12: padding
    const contentHeight = contentHeightProp - 12 * 2;
    // 20: padding
    let handCardHeight = contentHeight - 20 * 2;
    if (isPendingHandInput) {
      // 36: cancelbtn height 12: margintop cancelwrapper
      handCardHeight = handCardHeight - 36 - 12;
    } else {
      // 20: fixed number to make the cards not look too big
      handCardHeight = handCardHeight - 20;
    }
    const handCardWidth = handCardHeight * (2 / 3);

    return (
      <div
        id="player-hand-wrapper"
        className="box"
        style={{
          height: `${contentHeight}px`
        }}
      >
        <ul id="hand-card-container" ref={this.handCardContainerRef}>
          {handCards.map((handCard, i) => {
            return (
              <li
                className="hand-card"
                style={{
                  flex: `0 0 ${handCardWidth}px`,
                  height: handCardHeight
                }}
              >
                <figure className="image is-2by3" style={{ cursor: `pointer` }}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/cards/basic/${handCard.type}/${handCard.name}.png`
                    }
                    cardid={handCard.id}
                    // TODO: unused
                    inhandarea={0}
                    onClick={onHandCardClicked}
                    alt={`${handCard.name}`}
                  />
                </figure>
                <div className="image-popup-wrapper">
                  <figure
                    className="image image-popup"
                    style={{
                      left: -handCardsScrollLeftOffset
                    }}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        `/cards/detailed/${handCard.type}/${handCard.name}.png`
                      }
                      alt={`${handCard.name}`}
                    />
                  </figure>{' '}
                </div>
              </li>
            );
          })}
        </ul>
        {isPendingHandInput && (
          <div className="cancel-wrapper control has-text-right">
            <button
              className="button is-danger is-rounded"
              type="button"
              onClick={onCancelClicked}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default PlayerHandView;
