import { Col, Progress } from "antd";
import React from "react";
import { RENDER_LEAGUE_NAME } from "../helpers/renderRankIcon";

const RankDisplay = ({league, rankInfo}) => {
  console.log(league)
  return (
    <>
      <Col
        className="flex-center"
        span={24 / rankInfo?.length}
        style={{ flexDirection: "column" }}>
          <div style={{width:"100%"}}>
            <div style={{display: "flex", justifyContent:"space-evenly"}}>
              {/* <img alt="" width={"30%"} src={`/images/rank/Emblem_${league?.tier}.png`} /> */}
            <div>
              <p style={{ margin: "0px", color:"white", fontSize:"20px" }} className="michroma-font subtitle">
                {RENDER_LEAGUE_NAME[league?.queueType]}
              </p>
              <h2>
                <span className="michroma-font color-white">{league?.tier} </span>
                <span className="color-white">{league?.rank}</span>
              </h2>
              <p className="michroma-font color-white">W / L <span style={{color:"lawngreen"}}>{league?.wins}</span> - <span style={{color:"red"}}>{league?.losses}</span></p>
              <p className="color-white">
                {Math.floor((league?.wins / (league?.wins + league?.losses)) * 100)} %
              </p>
              </div>
              <Progress strokeColor={"purple"} style={{display:"flex", alignItems:"center"}} format={(percent) => <img style={{width:"75%"}} alt="" src={`/images/rank/Emblem_${league?.tier}.png`}/>} type="circle" percent={league?.leaguePoints} />
            </div>
          </div>
      </Col>
      {/* <Col
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
      </Col> */}
    </>
  );
};

export default RankDisplay;
