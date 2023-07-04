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
  const summonerName = data?.user?.name;
  const singleGame = data?.matches
  const summoner = data?.user;
  const rankInfo = data?.ranks;
  const mostPlayedChamps = data?.champs;
  const liveGame = useSelector((state) => state.liveGame);
  const [loading, setIsLoading] = useState(true);
  const dataLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    const payload = {
      patchVersion: patchVersion
    }
    patchVersion && dispatch(getItemData(payload));
  }, [dispatch, patchVersion]);

  useEffect(() => {
    localStorage.setItem('summoner_name', params?.name);
    localStorage.setItem('region', params?.region);
  }, [params])

  useEffect(() => {
    setIsLoading(true)
    const payload = {
      summoner_name: params?.name,
      region: params?.region,
      setIsLoading: setIsLoading
    };
    !data?.user?.name && dispatch(fetchAllData(payload));

    data && data?.user?.name.toLowerCase() !== params?.name?.toLocaleLowerCase() && dispatch(fetchAllData(payload));

    data?.user?.name && setIsLoading(false);
    // eslint-disable-next-line
  }, [params?.name, dispatch, data?.user?.name, params?.region]);

  useEffect(() => {
    if (!liveGame && data?.user?.id) {
      const payload = {
        summonerId: data?.user?.id,
        region: params?.region
      }
      dispatch(getUserLiveGame(payload))
    }
  }, [data?.user?.id, dispatch, params?.region, liveGame])

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

  return (
    <div
      className="home-image" 
      style={{
        minHeight: "calc(100vh - 57px)",
        background: "url('/images/home/jhinHome.jpg')",
        backgroundSize: "cover",
      }}
    >
          <>
          {(loading || dataLoading)  ? (
            <Row style={{minHeight: "100vh"}} align={"middle"} justify={"center"}>
              <Spin size="large" spinning={true}/>
            </Row>
          ) : (
            <>
            {summoner?.id ? (
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
                    <h1 style={{color:"white"}}>No user with given Summoner Name!</h1>
                </Row>
            )}
              </>
          )}
          </>
    </div>
  );
};

export default SummonerInfo;
