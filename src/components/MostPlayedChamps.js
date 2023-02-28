import { Avatar, Badge, Col } from "antd";
import React from "react";
import { CHAMP_ID_TO_NAME } from "../helpers/champIdToName";

export const MostPlayedChamps = ({mostPlayedChamps, champ}) => {
  return (
    <Col
      className="flex-center"
      span={24 / mostPlayedChamps?.length}
      style={{ flexDirection: "column" }}
    >
      <h4 className="michroma-font">{CHAMP_ID_TO_NAME[champ?.championId]}</h4>
      <div>
        <Badge
          offset={[-40, 80]}
          count={champ?.championPoints}
          overflowCount={999999999999999}
        >
          <Avatar
            size={80}
            src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${CHAMP_ID_TO_NAME[
              champ?.championId
            ]?.replace(/\s/g, "")}.png`}
          />
        </Badge>
      </div>
    </Col>
  );
};
