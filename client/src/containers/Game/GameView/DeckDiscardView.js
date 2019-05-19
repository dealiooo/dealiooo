import React, { Component } from 'react';

import { cardNameToDisplayName, cardTypeToDisplayName } from './utils';
import generateCards from './generateCards';

class DeckDiscardView extends Component {
  render() {
    const {
      currentPlayerId,
      cardsPlayed,
      deckCount,
      discard,
      contentHeight
    } = this.props;

    const frequencies = {
      property: {},
      property_wildcard: {},
      rent: {},
      rent_wildcard: {},
      building: {},
      action: {},
      money: {}
    };

    discard.forEach(
      card =>
        (frequencies[card.type][card.name] =
          frequencies[card.type][card.name] + 1 || 1)
    );

    return (
      <div
        className="box has-text-centered"
        style={{
          minHeight: `${contentHeight - 12}px`,
          maxHeight: `${contentHeight - 12}px`
        }}
      >
        <div className="box" style={{ padding: `4px 0px` }}>
          <h1 className="has-text-weight-bold">
            {`Current Turn: ${currentPlayerId}\n Cards Played: ${cardsPlayed}`}
          </h1>
        </div>
        <div
          className="columns is-vcentered"
          // 20: height of box padding
          // 32: height of currentPlayer box
          // 24: marginBottom of currentPlayer box
          // 12: height of column padding
          style={{
            minHeight: `${contentHeight - 20 - 32 - 24 - 12 * 2}px`,
            maxHeight: `${contentHeight - 20 - 32 - 24 - 12 * 2}px`
          }}
        >
          <div className="column">
            <h1 className="has-text-weight-bold">Deck</h1>
            <h2 class="subtitle" style={{ marginBottom: 0 }}>
              {deckCount}
            </h2>
          </div>
          <div className="column">
            <h1 className="has-text-weight-bold">Discard</h1>
            <div
              className="dropdown is-right is-hoverable"
              style={{
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                className="dropdown-trigger"
                style={{ display: 'flex', width: '100%' }}
              >
                <button
                  className="button is-fullwidth"
                  aria-haspopup="true"
                  aria-4="bank-column-dropdown-menu"
                >
                  <span>{discard.length}</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true" />
                  </span>
                </button>
              </div>
              <div
                className="dropdown-menu"
                id="bank-column-dropdown-menu"
                role="menu"
              >
                <div
                  className="dropdown-content"
                  style={{
                    overflow: 'auto'
                  }}
                >
                  <div className="dropdown-item">
                    <table
                      class="table is-fullwidth"
                      style={{
                        width: `${window.innerWidth / 1.8}px`
                      }}
                    >
                      <thead>
                        <tr>
                          {Object.keys(frequencies).map(key => (
                            <th className="has-text-centered">
                              {cardTypeToDisplayName(key)}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(frequencies).map((_, columnIndex) => {
                          return (
                            <tr>
                              {Object.keys(frequencies).map(cardTypeKey => {
                                const cardName = Object.keys(
                                  frequencies[cardTypeKey]
                                )[columnIndex];

                                if (cardName === undefined) {
                                  return <td />;
                                }

                                const cardQuantity =
                                  frequencies[cardTypeKey][cardName];

                                return (
                                  <td className="has-text-centered">
                                    {`${cardNameToDisplayName(
                                      cardName
                                    )} (${cardQuantity})`}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeckDiscardView;
