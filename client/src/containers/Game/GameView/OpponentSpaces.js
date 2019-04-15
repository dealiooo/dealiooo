import React from "react";
import PlayerSpace from "./PlayerSpace";

import Columns from "react-bulma-components/lib/components/columns";

import { getCssColumnOpponentPlayerSpaces } from "./utils";

const OpponentSpaces = ({ playerInfos }) => (
  <Columns>
    {playerInfos.map((playerInfo, position) => (
      <Columns.Column
        size={getCssColumnOpponentPlayerSpaces(playerInfos.length, position)}
      >
        <PlayerSpace playerInfo={playerInfo} />
      </Columns.Column>
    ))}
  </Columns>
);

export default OpponentSpaces;
