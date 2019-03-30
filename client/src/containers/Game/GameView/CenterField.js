import React from "react";

import Tile from "react-bulma-components/lib/components/tile";

import { CardPhoto, EmptyCardPhoto } from "./Cards/cards";

const CenterField = ({ lastDiscard }) => {
  return (
    <Tile
      kind="ancestor"
      className="has-background-grey-darker"
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 0,
        marginRight: 0
      }}
    >
      <Tile kind="parent" size={1}>
        <Tile kind="child" style={{ padding: 2 }}>
          {lastDiscard ? <CardPhoto card={lastDiscard} /> : <EmptyCardPhoto />}
        </Tile>
      </Tile>
    </Tile>
  );
};

export default CenterField;
