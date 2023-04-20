import { Card, Col, Empty, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BASE_URL_API,
  GET_USER_BY_NAME,
  GET_USER_RANKS,
} from "../api_constants/apiLink";
import { renderAvatarIcon } from "../helpers/avatarlevels";
import MatchDetailsInfo from "./MatchDetailsInfo";
import { MatchHistory } from "./MatchHistory";
import { MostPlayedChamps } from "./MostPlayedChamps";
import Overall from "./Overall";
import RankDisplay from "./RankDisplay";

const SummonerInfo = () => {
  const [summoner, setSummoner] = useState(null);
  const [rankInfo, setRankInfo] = useState(null);
  const [mostPlayedChamps, setMostPlayedChamps] = useState(null);
  const [matchList, setMatchList] = useState([]);
  const [singleGame, setSingleGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summonerNames, setSummonerNames] = useState([]);
  const [playedWith, setPlayedWith] = useState([]);
  const params = useParams();
  const summonerName = params?.name ? params?.name : localStorage.getItem("summoner_name");

  useEffect(() => {
    if (summonerName) {
      fetch(
        `${BASE_URL_API}${GET_USER_BY_NAME}${summonerName}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setSummoner(data));
    }
  }, [summonerName]);

  useEffect(() => {
    if (summoner?.id) {
      fetch(
        `${BASE_URL_API}${GET_USER_RANKS}${summoner?.id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setRankInfo(data));
    }
  }, [summoner?.id]);

  useEffect(() => {
    if (summoner?.id) {
      fetch(
        `${BASE_URL_API}lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner?.id}/top?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setMostPlayedChamps(data));
    }
  }, [summoner?.id]);

  async function getGamesIds() {
    const response = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner?.puuid}/ids?start=0&count=10&api_key=${process.env.REACT_APP_RIOT_API_KEY}`
    );
    const data = await response.json();
    setMatchList(data);
  }

  async function fetchGames() {
    setIsLoading(true);
    const ids = matchList;
    const gamesData = [];
    for (const id of ids) {
      const response = await fetch(
        `https://europe.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
      );
      const gameData = await response.json();
      gamesData.push(gameData);
    }
    setSingleGame(gamesData);
    localStorage.setItem("games", JSON.stringify(gamesData));
    setIsLoading(false);
  }

  useEffect(() => {
    getGamesIds();
    // eslint-disable-next-line
  }, [summoner?.puuid]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line
  }, [matchList]);

  const items = [
    {
      disabled: isLoading,
      key: "3",
      label: `Overall`,
      children: (
        <Overall
          isLoading={isLoading}
          singleGame={singleGame}
          matchList={matchList}
          setMatchList={setMatchList}
          summoner={summoner}
          summonerName={summonerName}
        />
      ),
    },
    {
      disabled: isLoading,
      key: "1",
      label: `Match History`,
      children: (
        singleGame?.length ? (
          <MatchHistory
            singleGame={singleGame}
            fetchGames={fetchGames}
            matchList={matchList}
            isLoading={isLoading}
            summonerName={summonerName}
            summoner={summoner}
          />
        ) : (
            <Empty style={{marginTop:"3%"}}></Empty>
        )
      ),
    },
    {
      disabled: isLoading,
      key: "2",
      label: `Played With`,
      children: (
          <MatchDetailsInfo
            playedWith={playedWith}
            setPlayedWith={setPlayedWith}
            summonerNames={summonerNames}
            setSummonerNames={setSummonerNames}
            isLoading={isLoading}
            singleGame={singleGame}
            summonerName={summonerName}
            summoner={summoner}
          />
      ),
    },
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
        {summoner ? (
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
        ) : (
          !isLoading && (
          <Row style={{paddingTop:"15%"}} justify="center">
            <Col span={12}>
              <Card bodyStyle={{padding:"10px"}}>
                <h1 style={{textAlign:"center"}}>Opps</h1>
                <h2 style={{textAlign:"center"}}>There is no summoner found by that name</h2>
              </Card>
            </Col>
          </Row>
          )
        )}
      </>
    </div>
  );
};

export default SummonerInfo;
