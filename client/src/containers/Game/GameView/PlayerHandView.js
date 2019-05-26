import React, { Component } from 'react';

import '../styles/cardHover.css';

class PlayerHandView extends Component {
  render() {
    const { handCards, onHandCardClicked, contentHeight } = this.props;

    return (
      <div
        className="box"
        style={{
          minHeight: `${contentHeight - 12 * 2}px`,
          maxHeight: `${contentHeight - 12 * 2}px`
        }}
      >
        <div className="columns is-centered is-multiline">
          {handCards.map(handCard => (
            <div
              className="column is-1"
              style={{ position: 'relative' }}
              key={handCard.id}
            >
              <div className="hover-container">
                <figure className="image is-2by3">
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
                <figure className="image image-popup">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/cards/detailed/${handCard.type}/${handCard.name}.png`
                    }
                    alt={`${handCard.name}`}
                  />
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PlayerHandView;
