import React, { Component } from "react";

import Columns from "react-bulma-components/lib/components/columns";

import "../styles/styles.css";

class GeneralInfoDisplay extends Component {
  render() {
    const {
      generalInfo: { timer, gameText, deckCount, discardCount }
    } = this.props;

    return (
      <div class="columns">
        <div class="column">
          <p class="notification is-info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu
            consectetur lorem, nec facilisis dolor. Morbi rhoncus, mi sit amet
            ornare tincidunt, augue sem aliquet mauris, non pretium orci nisl at
            est. Curabitur placerat pharetra augue. Etiam non eros nulla.
            Praesent aliquet sem dui, id varius enim convallis vel. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Donec convallis mauris
            felis, sit amet consectetur augue sollicitudin id.
          </p>
        </div>
        <div class="column">
          <p class="notification is-success">
            Nulla a mauris vel erat elementum scelerisque. Cras mollis consequat
            neque, vitae sagittis nisl dapibus porttitor. Donec et rutrum
            ligula. Donec luctus iaculis orci, nec imperdiet felis semper quis.
            Nulla a convallis eros, facilisis hendrerit risus. Nulla sit amet
            porta quam. Nullam maximus tempus sem, dapibus dapibus purus
            sollicitudin vel. Phasellus at rhoncus odio. Quisque sit amet ornare
            dolor. Maecenas accumsan viverra tristique. Etiam vulputate nibh
            ipsum, at rutrum lacus hendrerit ut. Nunc sodales diam purus, in
            ultricies nulla consectetur sit amet. Orci varius natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ut
            tincidunt mauris.
          </p>
        </div>
        <div class="column">
          <p class="notification is-warning">
            Pellentesque eros tortor, pharetra in lorem quis, maximus hendrerit
            ex. Praesent nunc ante, elementum at congue ut, ultricies quis
            lectus. Aenean vel elementum risus. Vestibulum aliquet justo in
            ligula dictum commodo. Nullam condimentum ante vitae nulla
            dignissim, vitae interdum neque dapibus. Aenean nec quam egestas,
            viverra ex vel, tempus lectus. Quisque eu euismod neque. Mauris
            aliquam neque a porta condimentum. Cras eget nisi turpis. Aenean
            lacus velit, dapibus eu aliquam eget, aliquet id quam. Integer
            ultricies est quis erat facilisis congue vel efficitur ipsum. Nunc
            id varius orci, consequat vehicula libero. Morbi maximus, orci in
            efficitur feugiat, quam lacus lobortis elit, in blandit mauris dolor
            sit amet mauris.
          </p>
        </div>
        <div class="column">
          <p class="notification is-danger">
            Morbi turpis nunc, porttitor ut bibendum et, tincidunt vel nisi. Ut
            magna massa, placerat id nunc at, venenatis sodales leo. Nunc
            dapibus, lacus ac molestie vestibulum, tortor mauris posuere turpis,
            at pretium orci orci in justo.
          </p>
        </div>
      </div>
      // <Columns className="is-vcentered">
      //   <Columns.Column
      //     className="has-text-centered"
      //     style={{ display: 'flex' }}
      //     size={2}
      //   >
      //     <p className="title">{timer || 'timer'}</p>
      //   </Columns.Column>
      //   <Columns.Column
      //     className="has-text-centered"
      //     style={{ display: 'flex' }}
      //     size={6}
      //   >
      //     {gameText ||
      //       'gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText gameText '}
      //   </Columns.Column>
      //   <Columns.Column className="has-text-centered" size={2}>
      //     <p className="title">Deck</p>
      //     <p className="subtitle">{deckCount}</p>
      //   </Columns.Column>
      //   <Columns.Column className="has-text-centered" size={2}>
      //     <p className="title">Discard</p>
      //     <p className="subtitle">{discardCount}</p>
      //   </Columns.Column>
      // </Columns>
    );
  }
}

export default GeneralInfoDisplay;
