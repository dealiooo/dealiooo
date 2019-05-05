import React, { Component } from 'react';

import { cardNameToDisplayName } from './utils';

class DeckDiscardView extends Component {
  render() {
    const { deckCount, discard, contentHeight } = this.props;

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
      <div className="box has-text-centered">
        <h1 className="has-text-weight-bold">Deck</h1>
        <h2 class="subtitle" style={{ marginBottom: 0 }}>
          {deckCount}
        </h2>

        <h1 className="has-text-weight-bold">Discard</h1>

        <div
          className="dropdown is-right is-hoverable"
          style={{ display: 'flex', width: '100%' }}
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
                overflow: 'auto',
                maxHeight: `${contentHeight * 2.2}px`
              }}
            >
              <div className="dropdown-item">
                <table class="table is-fullwidth is-size-5">
                  <thead>
                    <tr>
                      {Object.keys(frequencies).map(key => (
                        <th className="has-text-centered">
                          {cardNameToDisplayName(key)}
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
                              <td>
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
    );
  }
}

export default DeckDiscardView;
