import React, { Component } from 'react';

import { cardNameToDisplayName, cardTypeToDisplayName } from './utils';

class GameInfoView extends Component {
  render() {
    const { deckCount, discard, turnCount, contentHeight } = this.props;

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
        className="box is-paddingless has-text-centered"
        style={{
          display: `flex`,
          flexDirection: `column`,
          alignItems: `center`,
          // 12: column padding * 2 / 2
          height: `${contentHeight - 12}px`
        }}
      >
        <div
          className="columns is-marginless is-vcentered"
          style={{
            flexGrow: `1`,
            width: `100%`,
            marginBottom: `0px`
          }}
        >
          <div className="column">
            <h1
              className="subtitle has-text-weight-bold"
              style={{ marginBottom: `0px` }}
            >
              Deck
            </h1>
            <h2 style={{ marginBottom: 0 }}>{deckCount}</h2>
          </div>
          <div className="column">
            <h1
              className="subtitle has-text-weight-bold"
              style={{ marginBottom: `0px` }}
            >
              Turn #
            </h1>
            <h2 style={{ marginBottom: 0 }}>{turnCount}</h2>
          </div>
        </div>
        <div style={{ flexGrow: `1`, width: `100%` }}>
          <h1
            className="subtitle has-text-weight-bold"
            style={{ marginBottom: `0px` }}
          >
            Discard
          </h1>
          <div className="dropdown is-right is-hoverable">
            <div className="dropdown-trigger">
              <button className="button global-dark-hover" aria-haspopup="true">
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
                    className="table is-fullwidth"
                    style={{
                      width: `${window.innerWidth / 1.5}px`
                    }}
                  >
                    <thead>
                      <tr>
                        {Object.keys(frequencies).map(key => (
                          <th className="has-text-centered" key={key}>
                            {cardTypeToDisplayName(key)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(frequencies).map((cardType, columnIndex) => {
                        return (
                          <tr key={cardType}>
                            {Object.keys(frequencies).map(
                              (cardTypeInner, i) => {
                                const cardName = Object.keys(
                                  frequencies[cardTypeInner]
                                )[columnIndex];

                                if (cardName === undefined) {
                                  return <td key={i} />;
                                }

                                const cardQuantity =
                                  frequencies[cardTypeInner][cardName];

                                return (
                                  <td className="has-text-centered" key={i}>
                                    {`${cardNameToDisplayName(
                                      cardName
                                    )} (${cardQuantity})`}
                                  </td>
                                );
                              }
                            )}
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
    );
  }
}

export default GameInfoView;
