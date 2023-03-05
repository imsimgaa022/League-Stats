import { Avatar, Badge, Col, Row } from "antd";
import React from "react";
import { CHAMP_ID_TO_NAME } from "../helpers/champIdToName";

export const MostPlayedChamps = ({mostPlayedChamps, champ, index}) => {
  console.log(mostPlayedChamps);
  return (
    <>
    <Row style={{alignItems:"center", marginTop:"4%", color:"white"}} >
      <Col span={2}>
        <span className="michroma-font">{index + 1}.</span>
      </Col>
      <Col span={5}>
        <img width={"70%"} style={{borderRadius:"50%"}} alt="" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${CHAMP_ID_TO_NAME[champ?.championId]?.replace(/\s/g, "")}.png`}/>
      </Col>
      <Col span={5}>
        <span style={{fontWeight:"bold"}} className="michroma-font">{CHAMP_ID_TO_NAME[champ?.championId]}</span>
      </Col>
      <Col span={5}>
        <span className="michroma-font">{champ?.championPoints}</span>
      </Col>
      <Col span={3}>
        <img width={"70%"} src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898522/league-stats/mastery%20icons/level${champ?.championLevel}.png`}/>
      </Col>
    </Row>
    </>
  );
};
