import { Avatar, Badge, Button, Card, Col, Form, Input, Row, Skeleton, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BASE_URL_API,
  GET_USER_BY_NAME,
  GET_USER_RANKS,
} from "../api_constants/apiLink";
import MatchDetailsInfo from "./MatchDetailsInfo";
import { MatchHistory } from "./MatchHistory";
import { MostPlayedChamps } from "./MostPlayedChamps";
import NavBar from "./NavBar";
import Overall from "./Overall";
import RankDisplay from "./RankDisplay";

const SummonerInfo = () => {
  const [summoner, setSummoner] = useState(null);
  const [rankInfo, setRankInfo] = useState(null);
  const [mostPlayedChamps, setMostPlayedChamps] = useState(null);
  const [summonerName, setSummonerName] = useState(
    localStorage.getItem("summoner_name")
  );
  const [activeName, setActiveName] = useState(localStorage.getItem("summoner_name") || params?.name);
  const [matchList, setMatchList] = useState([]);
  const [singleGame, setSingleGame] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summonerNames, setSummonerNames] = useState([]);
  const [playedWith, setPlayedWith] = useState([]);
  const params = useParams();
  console.log(params?.name);

  useEffect(() => {
    setSummonerName(localStorage.getItem("summoner_name") || params?.name);
  }, [activeName])

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
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner?.puuid}/ids?start=0&count=20&api_key=${process.env.REACT_APP_RIOT_API_KEY}`
    );
    const data = await response.json();
    setMatchList(data);
  }

  async function fetchGames() {
    setIsLoading(true);
    const ids = matchList;
    const gamesData = [];
    console.log(gamesData);
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
  }, [summoner]);

  useEffect(() => {
    fetchGames();
  }, [matchList]);

  const items = [
    {
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
      key: "1",
      label: `Match History`,
      children: (
        <MatchHistory
          singleGame={singleGame}
          fetchGames={fetchGames}
          matchList={matchList}
          isLoading={isLoading}
          summonerName={summonerName}
          summoner={summoner}
        />
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
          isLoading={isLoading}
          singleGame={singleGame}
          summonerName={summonerName}
          summoner={summoner}
        />
      ),
    },
  ];

  const initialValues = {
    summoner_name: summonerName,
  };

  const handleFinish = (values) => {
    setIsLoading(true);
    setSummonerName(values?.summoner_name);
    localStorage.setItem("summoner_name", values?.summoner_name);
    localStorage.removeItem("games");
    setMatchList([]);
    setSingleGame([]);
    setSummonerNames([]);
    setPlayedWith([]);
  };

  return (
    <div
      className="home-image" 
      style={{
        height: "100vh",
        background: "url('/images/home/jhinHome.jpg')",
        backgroundSize: "cover",
      }}
    >
      <>
        {summoner && (
          <>
            <Row style={{paddingTop: "2%"}}>
              <Col style={{ paddingTop: "0%", paddingLeft: "2%" }} span={8}>
                <Card style={{ marginBottom: "2%", border: "1px solid rgb(59,43,68)" }}>
                  {isLoading ? (<Skeleton avatar active/>) : (

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      className="michroma-font subtitle"
                      style={{ textAlign: "center" }}
                    >
                      {summoner?.name}
                    </p>
                    <Badge
                      color="hwb(205 6% 9%)"
                      offset={[-40, 80]}
                      count={summoner?.summonerLevel}
                      overflowCount={5000}
                    >
                      <Avatar
                        size={80}
                        src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${summoner?.profileIconId}.png`}
                      />
                    </Badge>
                  </div>
                  )}
                </Card>
                <Card style={{ marginBottom: "2%" }}>
                  <Skeleton active avatar loading={isLoading}>
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
                  </Skeleton>
                </Card>
                <Card>
                  <Row>
                    <Col span={24}>
                      <p
                        className="michroma-font subtitle"
                        style={{ textAlign: "center" }}
                      >
                        Most played Champions
                      </p>
                    </Col>
                    {mostPlayedChamps?.map((champ) => {
                      return (
                        <>
                          <MostPlayedChamps
                            champ={champ}
                            mostPlayedChamps={mostPlayedChamps}
                          />
                        </>
                      );
                    })}
                  </Row>
                </Card>
              </Col>
              <Col
                style={{
                  paddingTop: "0%",
                  paddingRight: "2%",
                  paddingLeft: "2%",
                }}
                span={16}
              >
                <Card>
                  <Tabs
                    tabBarGutter={80}
                    centered
                    className="custom-tabs michroma-font"
                    defaultActiveKey="3"
                    items={items}
                  />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </>
    </div>
  );
};

export default SummonerInfo;
