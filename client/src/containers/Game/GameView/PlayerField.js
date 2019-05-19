import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import '../styles/cardColors.css';

import generateCards from './generateCards';
import { computerTotalCardValues, cardNameToDisplayName } from './utils';

// TODO: property sets should have ratio for how much left to finish set

class MDCard extends Component {
  render() {
    const {
      card,
      propertyIndex,
      optionIndex,
      onCardClicked,
      containerStyle,
      imgStyle
    } = this.props;

    return (
      <figure className="image" style={containerStyle}>
        <img
          src={
            process.env.PUBLIC_URL +
            `/cards/basic/${card.type}/${card.name}.png`
          }
          cardid={card.id}
          inPropertyArea={true}
          optionindex={optionIndex}
          propertyindex={propertyIndex}
          onCardClicked={onCardClicked}
          alt={`${card.name}`}
          style={imgStyle}
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
    const { actionCards, contentHeight } = this.props;

    return (
      <div className="box" style={{ paddingTop: 8 }}>
        <h1 className="has-text-centered has-text-weight-bold">Action</h1>

        <div
          className="columns has-text-centered"
          id={`${this.props.id}-action-column`}
          style={{
            position: 'relative',
            minHeight: `${contentHeight - 12 - 8 - 24}px`,
            maxHeight: `${contentHeight - 12 - 8 - 24}px`
          }}
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

  getPropertySetCssColor(propertySet) {
    return propertySet.length ? propertySet[0].mainColor : '';
  }

  render() {
    const {
      id,
      propertyCards,
      contentHeight: height,
      onPropertyCardClicked
    } = this.props;

    const borderWidth = 4;
    const cardGap = 4;
    const setGap = 6;
    let prevSetOffsetSum = 0;

    const contentHeight = height - 12 - 8 - 24 - 12;
    const imageWidth = contentHeight * (2 / 3);
    const imageHeight = contentHeight - 2 * (cardGap + borderWidth);

    const setMiddleLayerHeight = imageHeight + 2 * cardGap;

    const getSetOffset = i =>
      2 * (borderWidth + cardGap) +
      (propertyCards[i].length - 1) * cardGap +
      propertyCards[i].length * imageWidth;
    let currentSetOuterWidth = 0;
    let currentSetMiddleWidth = 0;
    let currentSetInnerWidth = 0;

    return (
      <div className="box" style={{ padding: `8px` }}>
        <h1 className="has-text-centered has-text-weight-bold">Property</h1>
        <div
          id={`${id}-property-column`}
          style={{
            position: 'relative',
            overflowX: 'auto',
            marginTop: '0px',
            backgroundColor: 'white',
            minHeight: contentHeight,
            maxHeight: contentHeight
          }}
        >
          {propertyCards.map((propertySet, i) => {
            if (i > 0) {
              prevSetOffsetSum += getSetOffset(i - 1);
            }
            currentSetOuterWidth = getSetOffset(i);
            currentSetMiddleWidth = currentSetOuterWidth - 2 * borderWidth;
            currentSetInnerWidth = currentSetMiddleWidth - 2 * cardGap;

            /*<!-- SetOuterLayer -->*/
            return (
              <div
                className={`${this.getPropertySetCssColor(propertySet)}`}
                propertyIndex={i}
                onClick={onPropertyCardClicked}
                style={{
                  position: `absolute`,
                  left: `${i * setGap + prevSetOffsetSum}px`,
                  minHeight: contentHeight,
                  maxHeight: contentHeight,
                  minWidth: currentSetOuterWidth,
                  maxWidth: currentSetOuterWidth,
                  borderRadius: '8px'
                }}
              >
                {/* <!-- SetMiddleLayer --> */}
                <div
                  style={{
                    position: `absolute`,
                    backgroundColor: `white`,
                    top: `${borderWidth}px`,
                    left: `${borderWidth}px`,
                    minWidth: `${currentSetMiddleWidth}px`,
                    maxWidth: `${currentSetMiddleWidth}px`,
                    minHeight: setMiddleLayerHeight,
                    maxHeight: setMiddleLayerHeight,
                    borderRadius: '4px'
                  }}
                >
                  {/* <!-- SetInnerLayer --> */}
                  <div
                    style={{
                      position: `absolute`,
                      left: `${cardGap}px`,
                      minWidth: `${currentSetInnerWidth}px`,
                      maxWidth: `${currentSetInnerWidth}px`,
                      minHeight: contentHeight,
                      maxHeight: contentHeight
                    }}
                  >
                    {propertySet.map((propertyCard, i) => {
                      /* <!-- CardLayer --> */
                      return (
                        <MDCard
                          card={propertyCard}
                          containerStyle={{
                            float: `left`,
                            position: `absolute`,
                            top: `${cardGap}px`,
                            left: `${i * (imageWidth + cardGap)}px`,
                            minHeight: imageHeight,
                            maxHeight: imageHeight,
                            minWidth: imageWidth,
                            maxWidth: imageWidth
                          }}
                          imgStyle={{
                            minHeight: imageHeight,
                            maxHeight: imageHeight,
                            minWidth: imageWidth,
                            maxWidth: imageWidth
                          }}
                          propertyIndex={i}
                          inPropertyArea={1}
                          onClick={onPropertyCardClicked}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class BankColumn extends Component {
  render() {
    const { bankCards, contentHeight } = this.props;
    const totalValue = computerTotalCardValues(bankCards);

    const frequencies = {
      '1-dollar': 0,
      '2-dollar': 0,
      '3-dollar': 0,
      '4-dollar': 0,
      '5-dollar': 0,
      '10-dollar': 0
    };

    bankCards.forEach(card => {
      if (card.type !== `money`) {
        frequencies[`${card.value}-dollar`]++;
      } else {
        frequencies[card.name]++;
      }
    });

    return (
      <div
        className="box"
        style={{
          paddingTop: 8,
          minHeight: `${contentHeight - 16}px`,
          maxHeight: `${contentHeight - 16}px`
        }}
      >
        <h1 className="has-text-centered has-text-weight-bold">Bank</h1>
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
                <table class="table is-fullwidth is-size-6">
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
                          {`$${cardNameToDisplayName(key)}`}
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
    const { buildingCards, contentHeight } = this.props;
    const frequencies = { house: 0, hotel: 0 };

    buildingCards.forEach(card => frequencies[card.name]++);

    return (
      <div
        className="box"
        style={{
          paddingTop: 8,
          minHeight: `${contentHeight - 16}px`,
          maxHeight: `${contentHeight - 16}px`
        }}
      >
        <h1 className="has-text-centered has-text-weight-bold">Building</h1>
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
    const { playerInfo, onPropertyCardClicked, contentHeight } = this.props;

    const { actionCards, bankCards, buildingCards, propertyCards } = playerInfo;

    return (
      <div className="columns is-marginless">
        <div
          className="column"
          style={{
            minHeight: `${contentHeight}px`,
            maxHeight: `${contentHeight}px`
          }}
        >
          <ActionColumn
            id={playerInfo.id}
            actionCards={actionCards}
            contentHeight={contentHeight}
          />
        </div>
        <div
          className="column is-8"
          style={{
            minHeight: `${contentHeight}px`,
            maxHeight: `${contentHeight}px`
          }}
        >
          <PropertyColumn
            id={playerInfo.id}
            propertyCards={propertyCards}
            contentHeight={contentHeight}
            onPropertyCardClicked={onPropertyCardClicked}
          />
        </div>
        <div className="column">
          <BankColumn bankCards={bankCards} contentHeight={contentHeight} />
        </div>
        <div className="column">
          <BuildingColumn
            buildingCards={buildingCards}
            contentHeight={contentHeight}
          />
        </div>
      </div>
    );
  }
}

export default PlayerField;
