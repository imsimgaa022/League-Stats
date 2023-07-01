import { Col, Empty, Row, Spin, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { renderAvatarIcon } from "../helpers/avatarlevels";
import { fetchAllData, getItemData, getUserLiveGame } from "../redux/actions";
import LiveGame from "./LiveGame";
import MatchDetailsInfo from "./MatchDetailsInfo";
import { MatchHistory } from "./MatchHistory";
import Overall from "./Overall";
import PlayedChampsTab from "./PlayedChampsTab";
import RankDisplay from "./RankDisplay";

const SummonerInfo = () => {
  const params = useParams();
  const patchVersion = useSelector((state) => state.patchVersion);
  const dispatch = useDispatch();
  const [matchList, setMatchList] = useState([]);
  const [summonerNames, setSummonerNames] = useState([]);
  const data = useSelector((state) => state.data);
  const dataIsLoading = useSelector((state) => state.isLoading);
  const summonerName = data?.user?.name;
  const singleGame = data?.matches
  const summoner = data?.user;
  const rankInfo = data?.ranks;
  const mostPlayedChamps = data?.champs;
  const liveGame = useSelector((state) => state.liveGame);

  useEffect(() => {
    const payload = {
      patchVersion: patchVersion
    }
    patchVersion && dispatch(getItemData(payload));
  }, [dispatch, patchVersion]);

  useEffect(() => {
    localStorage.setItem('summoner_name', params?.name);
  }, [params])

  useEffect(() => {
    const payload = {
      summoner_name: params?.name,
    };
    data?.user?.name !== params?.name && dispatch(fetchAllData(payload));
  }, [params?.name, dispatch, data?.user?.name]);

  useEffect(() => {
    if (data?.user?.id) {
      const payload = {summonerId: data?.user?.id}
      dispatch(getUserLiveGame(payload))
    }
  }, [data?.user?.id, dispatch])


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
      key: "5",
      label: "Most played Champions",
      children: (
        <PlayedChampsTab mostPlayedChamps={mostPlayedChamps}/>
      )
    },
    {
      key: "2",
      label: `Played With`,
      children: (
          <MatchDetailsInfo
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
      disabled: !liveGame,
      children: (
        <LiveGame liveGame={liveGame}/>
      )
    },
  ];

  console.log(data)

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
          {dataIsLoading ? (
            <Row style={{minHeight: "100vh"}} align={"middle"} justify={"center"}>
              <Spin size="large" spinning={true}/>
            </Row>
          ) : (
            <>
            {data?.user?.id ? (
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
                        <img style={{position:"absolute", top:"24%", left:"25%", borderRadius:"50%"}} width={"100px"} alt="" src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/profileicon/${summoner?.profileIconId}.png`}/>
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
                </Row>
                <Row>
                <Col style={{paddingTop: "0%",paddingRight: "2%",paddingLeft: "2%",}} span={24}>
                    <Tabs
                      type="card"
                      className="overal-tabs michroma-font"
                      defaultActiveKey="3"
                      items={items}
                    />
                </Col>
                </Row>
              </>
            ) : (
                <Row style={{minHeight:"100vh"}} align="middle" justify="center">
                  {dataIsLoading ? (
                    <Spin size="large"/>
                  ) : (
                    <h1 style={{color:"white"}}>No user with given Summoner Name!</h1>
                  )}
                </Row>
            )}
              </>
          )}
          </>
    </div>
  );
};

export default SummonerInfo;
