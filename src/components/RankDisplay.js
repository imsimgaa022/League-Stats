import { Col } from "antd";
import React from "react";
import { RENDER_LEAGUE_NAME } from "../helpers/renderRankIcon";

const RankDisplay = ({league, rankInfo}) => {
  return (
    <Col
      className="flex-center"
      span={24 / rankInfo?.length}
      style={{ flexDirection: "column" }}
    >
      <p style={{ margin: "0px" }} className="michroma-font subtitle">
        {RENDER_LEAGUE_NAME[league?.queueType]}
      </p>
      <div className="flex-center">
        <img alt="" width={"20%"} src={`/images/rank/Emblem_${league?.tier}.png`} />
      </div>
      <h4>
        <span className="michroma-font">{league?.tier} </span>
        <span>{league?.rank}</span>
      </h4>
      <span>
        W {league?.wins} - {league?.losses} L
      </span>
      <span>
        {Math.floor((league?.wins / (league?.wins + league?.losses)) * 100)} %
      </span>
    </Col>
  );
};

export default RankDisplay;
