import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CHAMP_ID_TO_NAME } from "../helpers/champIdToName";

export const MostPlayedChamps = ({mostPlayedChamps, champ, index}) => {
  const patchVersion = useSelector((state) => state.patchVersion);
  const navigate = useNavigate();

  const handleChampClick = (champion) => {
    navigate(`/champions/${champion?.replace(/\s/g, "")}`);
  }

  return (
    <>
    <Row style={{alignItems:"center", marginTop:"4%", color:"white"}} >
      <Col span={2}>
        <span className="michroma-font">{index + 1}.</span>
      </Col>
      <Col span={6}>
        <img onClick={() => handleChampClick(CHAMP_ID_TO_NAME[champ?.championId])} width={"70%"} style={{borderRadius:"50%", cursor:"pointer"}} alt="" src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[champ?.championId]?.replace(/\s/g, "")}.png`}/>
      </Col>
      <Col span={11}>
        <p style={{fontWeight:"bold"}} className="michroma-font">{CHAMP_ID_TO_NAME[champ?.championId]}</p>
        <p className="michroma-font">{champ?.championPoints}</p>
      </Col>
      <Col span={5}>
        <img width={"70%"} alt="" src={`https://res.cloudinary.com/mistahpig/image/upload/v1621898522/league-stats/mastery%20icons/level${champ?.championLevel}.png`}/>
      </Col>
    </Row>
    </>
  );
};
