import React, { Component } from 'react';

import '../styles/cardHover.css';

class PlayerHandView extends Component {
  render() {
    const { handCards, onHandCardClicked } = this.props;

    return (
      <div className="box">
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
                    id={handCard.id}
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
