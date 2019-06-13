import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import '../styles/cardColors.css';

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
              <div
                key={actionCard.id}
                className="global-light-hover"
                style={{
                  border: `1px solid #dbdbdb`,
                  borderRadius: `4px`,
                  cursor: `default`
                }}
              >
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
      <div className="box" style={{ padding: 8 }}>
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
                key={i}
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
    const { bankCards, contentHeight, onBankCardClicked } = this.props;
    const totalValue = computerTotalCardValues(bankCards);

    const frequencies = {
      '1-dollar': 0,
      '2-dollar': 0,
      '3-dollar': 0,
      '4-dollar': 0,
      '5-dollar': 0,
      '10-dollar': 0
    };

    const cardIds = {
      '1-dollar': -1,
      '2-dollar': -1,
      '3-dollar': -1,
      '4-dollar': -1,
      '5-dollar': -1,
      '10-dollar': -1
    };

    bankCards.forEach(card => {
      if (card.type !== `money`) {
        frequencies[`${card.value}-dollar`]++;
        if (cardIds[`${card.value}-dollar`] === -1) {
          cardIds[`${card.value}-dollar`] = card.id;
        }
      } else {
        frequencies[card.name]++;
        if (cardIds[card.name] === -1) {
          cardIds[card.name] = card.id;
        }
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
              className="button is-fullwidth global-light-hover"
              aria-haspopup="true"
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
                {Object.keys(frequencies).map((key, i) => {
                  return (
                    <div
                      key={key}
                      style={{
                        marginBottom: `${
                          i === frequencies.length - 1 ? '0px' : '8px'
                        }`
                      }}
                    >
                      <button
                        className="money-btn button is-fullwidth global-light-hover"
                        onClick={onBankCardClicked}
                        moneycardid={cardIds[key]}
                      >
                        <h1 className="has-text-centered">
                          {`$${cardNameToDisplayName(key)} | Qty: ${
                            frequencies[key]
                          }`}
                        </h1>
                      </button>
                    </div>
                  );
                })}
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
    const {
      buildingCards,
      contentHeight,
      onHouseCardClicked,
      onHotelCardClicked
    } = this.props;
    const frequencies = { house: 0, hotel: 0 };

    buildingCards.forEach(card => frequencies[card.name]++);

    let houseId = -1;
    let hotelId = -1;

    for (let i = 0; i < buildingCards.length; i++) {
      if (buildingCards[i].type === 'house') {
        houseId = buildingCards[i].id;
      } else if (buildingCards[i].type === 'hotel') {
        hotelId = buildingCards[i].id;
      }
    }

    return (
      <div
        className="box"
        style={{
          paddingTop: 8,
          height: `${contentHeight - 16}px`
        }}
      >
        <h1 className="has-text-centered has-text-weight-bold">Building</h1>
        <div
          className="columns is-vcentered"
          style={{
            height: `100%`
          }}
          id="building-column"
        >
          <div className="column">
            <button
              className="button is-fullwidth is-block subtitle global-light-hover"
              style={{ margin: `0 auto` }}
              onClick={onHouseCardClicked}
              houseid={houseId}
            >
              <div>
                <span
                  className="icon"
                  onClick={onHouseCardClicked}
                  houseid={houseId}
                >
                  <i
                    className="fa fa-home"
                    onClick={onHouseCardClicked}
                    houseid={houseId}
                  />
                </span>
                <span className="icon is-small">
                  <i className="fa fa-grip-lines" />
                </span>
                <span
                  className="has-text-weight-bold"
                  onClick={onHouseCardClicked}
                  houseid={houseId}
                >
                  {` ${frequencies.house}`}
                </span>
              </div>
            </button>
            <button
              className="button is-fullwidth is-block subtitle global-light-hover"
              style={{ margin: `0 auto`, marginTop: `8px` }}
              onClick={onHotelCardClicked}
              hotelid={hotelId}
            >
              <span
                className="icon"
                onClick={onHotelCardClicked}
                hotelid={hotelId}
              >
                <i
                  className="fa fa-hotel"
                  onClick={onHotelCardClicked}
                  hotelid={hotelId}
                />
              </span>
              <span className="icon is-small">
                <i className="fa fa-grip-lines" />
              </span>
              <span
                className="has-text-weight-bold"
                onClick={onHotelCardClicked}
                hotelid={hotelId}
              >
                {` ${frequencies.hotel}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class PlayerField extends Component {
  render() {
    const {
      playerInfo,
      onPropertyCardClicked,
      onBankCardClicked,
      onHouseCardClicked,
      onHotelCardClicked,
      contentHeight
    } = this.props;

    const { actionCards, bankCards, buildingCards, propertyCards } = playerInfo;

    return (
      <div
        className="columns is-marginless is-vcentered"
        style={{
          minHeight: `${contentHeight}px`,
          maxHeight: `${contentHeight}px`
        }}
      >
        <div className="column">
          <ActionColumn
            id={playerInfo.id}
            actionCards={actionCards}
            contentHeight={contentHeight}
          />
        </div>
        <div className="column is-8">
          <PropertyColumn
            id={playerInfo.id}
            propertyCards={propertyCards}
            contentHeight={contentHeight}
            onPropertyCardClicked={onPropertyCardClicked}
          />
        </div>
        <div className="column">
          <BankColumn
            bankCards={bankCards}
            contentHeight={contentHeight}
            onBankCardClicked={onBankCardClicked}
          />
        </div>
        <div className="column">
          <BuildingColumn
            buildingCards={buildingCards}
            onHouseCardClicked={onHouseCardClicked}
            onHotelCardClicked={onHotelCardClicked}
            contentHeight={contentHeight}
          />
        </div>
      </div>
    );
  }
}

export default PlayerField;
