import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PerfectScrollbar from 'perfect-scrollbar';

import generateCards from './generateCards';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import '../styles/cardColors.css';
import '../styles/cardColorsLightAccent.css';

import { computerTotalCardValues, cardNameToDisplayName } from './utils';

class MDCard extends Component {
  render() {
    const { card } = this.props;

    return (
      <figure className="image">
        <img
          src={
            process.env.PUBLIC_URL +
            `/cards/basic/${card.type}/${card.name}.png`
          }
          alt={`${card.name}`}
        />
      </figure>
    );
  }
}

class ActionColumn extends Component {
  componentDidMount() {
    this.ps = new PerfectScrollbar(
      window.document.getElementById(`${this.props.id}-action-column`),
      { useBothWheelAxes: true, suppressScrollX: true }
    );
  }

  componentDidUpdate = _ => this.ps.update();

  render() {
    const { actionCards } = this.props;

    return (
      <div className="box">
        <h1 className="has-text-centered">Action</h1>

        <div
          className="columns has-text-centered"
          id={`${this.props.id}-action-column`}
          style={{ position: 'relative', height: '180px' }}
        >
          <div className="column">
            {actionCards.map(actionCard => (
              <div key={actionCard.id}>
                {cardNameToDisplayName(actionCard.name)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class PropertyColumn extends Component {
  componentDidMount() {
    this.ps = new PerfectScrollbar(
      window.document.getElementById(`${this.props.id}-property-column`),
      {
        useBothWheelAxes: true,
        suppressScrollY: true
      }
    );
  }

  componentDidUpdate = _ => this.ps.update();

  render() {
    const { id, propertyCards } = this.props;

    return (
      <div className="box">
        <h1 className="has-text-centered">Property</h1>
        <div
          className="columns"
          id={`${id}-property-column`}
          style={{
            position: 'relative',
            overflowX: 'hidden',
            marginTop: '0px',
            padding: '8px',
            backgroundColor: 'white'
          }}
        >
          {propertyCards.map((propertySet, i) => (
            <div
              className={`column is-4 ${propertySet[0].mainColor}-light-accent`}
              style={{
                padding: '8px',
                marginLeft: `${i === 0 ? '0px' : '12px'}`,
                marginRight: '12px',
                borderRadius: '8px'
              }}
            >
              <div className="columns">
                {propertySet.map(pCard => (
                  <div className="column">
                    <MDCard card={pCard} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

class BankColumn extends Component {
  render() {
    const { bankCards } = this.props;
    const totalValue = computerTotalCardValues(bankCards);

    const frequencies = {
      '1-dollar': 0,
      '2-dollar': 0,
      '3-dollar': 0,
      '4-dollar': 0,
      '5-dollar': 0,
      '10-dollar': 0
    };

    bankCards.forEach(card => frequencies[card.name]++);

    return (
      <div className="box">
        <h1 className="has-text-centered">Bank</h1>
        <div
          className="dropdown is-hoverable"
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
              <span>{`$${totalValue}`}</span>
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
            <div className="dropdown-content">
              <div className="dropdown-item">
                <table class="table is-fullwidth">
                  <thead>
                    <tr>
                      <th className="has-text-centered">Card</th>
                      <th className="has-text-centered">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(frequencies).map(key => (
                      <tr>
                        <td className="has-text-centered">
                          {cardNameToDisplayName(key)}
                        </td>
                        <td className="has-text-centered">
                          {frequencies[key]}
                        </td>
                      </tr>
                    ))}
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

class BuildingColumn extends Component {
  render() {
    const { buildingCards } = this.props;
    const frequencies = { house: 0, hotel: 0 };

    buildingCards.forEach(card => frequencies[card.name]++);

    return (
      <div className="box">
        <h1 className="has-text-centered">Building</h1>
        <div className="columns" id="building-column">
          <div className="column has-text-centered">
            <div>
              <span className="icon">
                <i className="fa fa-home" />
              </span>
              <span>= {frequencies.house}</span>
            </div>
            <div>
              <span className="icon">
                <i className="fa fa-hotel" />
              </span>
              <span>= {frequencies.hotel}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class PlayerField extends Component {
  render() {
    const { playerInfo } = this.props;
    const {
      action_cards: actionCards,
      bank_cards: bankCards,
      building_cards: buildingCards,
      property_cards: propertyCards
    } = playerInfo;

    const debugUi = false;
    if (debugUi) {
      const actionCards = generateCards('action', 10);
      const bankCards = generateCards('money', 10);
      const propertyCards = generateCards('property', 10);
      const buildingCards = generateCards('building', 5);

      return (
        <div>
          <div className="columns">
            <div className="column">
              <ActionColumn id={playerInfo.id} actionCards={actionCards} />
            </div>
            <div className="column is-8">
              <PropertyColumn
                id={playerInfo.id}
                propertyCards={propertyCards}
              />
            </div>
            <div className="column">
              <BankColumn bankCards={bankCards} />
            </div>
            <div className="column">
              <BuildingColumn buildingCards={buildingCards} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="columns">
          <div className="column">
            <ActionColumn id={playerInfo.id} actionCards={actionCards} />
          </div>
          <div className="column is-8">
            <PropertyColumn id={playerInfo.id} propertyCards={propertyCards} />
          </div>
          <div className="column">
            <BankColumn bankCards={bankCards} />
          </div>
          <div className="column">
            <BuildingColumn buildingCards={buildingCards} />
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerField;
