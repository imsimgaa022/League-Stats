import { Col, Empty, Row, Tabs } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { renderAvatarIcon } from "../helpers/avatarlevels";
import MatchDetailsInfo from "./MatchDetailsInfo";
import { MatchHistory } from "./MatchHistory";
import { MostPlayedChamps } from "./MostPlayedChamps";
import Overall from "./Overall";
import RankDisplay from "./RankDisplay";

const SummonerInfo = () => {
  const [matchList, setMatchList] = useState([]);
  const [summonerNames, setSummonerNames] = useState([]);
  const [playedWith, setPlayedWith] = useState([]);
  const data = useSelector((state) => state.data);
  const summonerName = data?.user?.name;
  const singleGame = data?.matches
  const summoner = data?.user;
  const rankInfo = data?.ranks;
  const mostPlayedChamps = data?.champs;

  const items = [
    {
      key: "3",
      label: `Overall`,
      children: (
        <Overall
          singleGame={singleGame}
          matchList={matchList}
          setMatchList={setMatchList}
          summoner={summoner}
          summonerName={summonerName}
        />
      ),
    },
    {
      key: "1",
      label: `Match History`,
      children: (
        singleGame?.length ? (
          <MatchHistory
            singleGame={singleGame}
            matchList={matchList}
            summonerName={summonerName}
            summoner={summoner}
          />
        ) : (
            <Empty style={{marginTop:"3%"}}></Empty>
        )
      ),
    },
    {
      key: "2",
      label: `Played With`,
      children: (
          <MatchDetailsInfo
            playedWith={playedWith}
            setPlayedWith={setPlayedWith}
            summonerNames={summonerNames}
            setSummonerNames={setSummonerNames}
            singleGame={singleGame}
            summonerName={summonerName}
            summoner={summoner}
          />
      ),
    },
    {
      key: "4",
      label: "Live game",
      disabled: true,
    }
  ];

  return (
    <div
      className="home-image" 
      style={{
        minHeight: "100vh",
        background: "url('/images/home/jhinHome.jpg')",
        backgroundSize: "cover",
      }}
    >
      <>
        {summoner && (
          <>
            <Row style={{paddingTop: "2%"}}>
              <Col style={{ paddingTop: "0%", paddingLeft: "2%" }} span={24}>
                <Row style={{alignItems:"center"}}>
                  <Col span={8}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      flexDirection:"column-reverse"
                    }}
                  >
                     
                    <div style={{position: "relative"}}>
                      <img style={{zIndex:"1000", position:"relative"}} width={"200px"} alt="" src={renderAvatarIcon(summoner?.summonerLevel)}/>
                      <img style={{position:"absolute", top:"24%", left:"25%", borderRadius:"50%"}} width={"100px"} alt="" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summoner?.profileIconId}.png`}/>
                      <span style={{position:"absolute", bottom:"17%", left:"44%", color:"white", zIndex:"2000"}}>{summoner?.summonerLevel}</span>
                    </div>
                    <p
                      className="michroma-font subtitle"
                      style={{ textAlign: "center", color:"white", fontStyle:"italic" }}
                    >
                       {summoner?.name}
                    </p>
                  </div>
                  </Col>
                  <Col span={16}>
                    <Row>
                      {rankInfo?.map((league, index) => {
                        return (
                          <RankDisplay
                            key={index}
                            league={league}
                            rankInfo={rankInfo}
                          />
                        );
                      })}
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col
                style={{
                  paddingTop: "0%",
                  paddingRight: "2%",
                  paddingLeft: "2%",
                }}
                span={18}
              >
                  <Tabs
                    type="card"
                    className="overal-tabs michroma-font"
                    defaultActiveKey="3"
                    items={items}
                  />
              </Col>
              <Col span={6}>
              <Row>
                <span style={{color:"white"}} className="michroma-font subtitle">Most played Champions</span>
              </Row>
              {mostPlayedChamps?.length ? mostPlayedChamps?.map((champ, index) => {
                return (
                  <>
                    <MostPlayedChamps
                      champ={champ}
                      index={index}
                      mostPlayedChamps={mostPlayedChamps}
                    />
                  </>
                );
              }) : (<Empty style={{marginTop:"5%"}}></Empty>)}
              </Col>
            </Row>
          </>
        )}
      </>
    </div>
  );
};

export default SummonerInfo;
