import { Col, Empty, Progress, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Overall = ({ summoner, summonerName, singleGame, isLoading }) => {
  const [playerGames, setPlayerGames] = useState([]);
  const [topThree, setTopThree] = useState([]);
  const [roles, setRoles] = useState(null);
  const patchVersion = useSelector((state) => state.patchVersion);
  let hasMatchHistory = !!playerGames?.length;

  useEffect(() => {
    let singlePlayerGame = [];
    singleGame?.forEach((games) => {
      singlePlayerGame.push(
        games?.info?.participants?.filter(
          (obj) => obj.summonerName === summonerName
        )
      );
    });
    setPlayerGames([...singlePlayerGame]);
    // eslint-disable-next-line
  }, [singleGame]);

  const calculateGamesWon = () => {
    let wins = 0;
    for (let i = 0; i < playerGames.length; i++) {
      if (playerGames?.[i]?.[0]?.win) {
        wins++;
      }
    }
    return wins;
  };

  const calculatePlayerKills = () => {
    let kills = 0;
    for (let i = 0; i < playerGames.length; i++) {
      kills += playerGames[i][0]?.kills;
    }
    return kills;
  };
  const calculatePlayerDeaths = () => {
    let deaths = 0;
    for (let i = 0; i < playerGames.length; i++) {
      deaths += playerGames[i][0]?.deaths;
    }
    return deaths;
  };
  const calculatePlayerAssists = () => {
    let assists = 0;
    for (let i = 0; i < playerGames.length; i++) {
      assists += playerGames[i][0]?.assists;
    }
    return assists;
  };

  useEffect(() => {
    const counts = {};
    const wins = {};
    const game = [];
    const roles = {};
    playerGames.forEach((obj) => {
      counts[obj[0]?.championName] = (counts[obj[0]?.championName] || 0) + 1;
      roles[obj[0]?.teamPosition] = (roles[obj[0]?.teamPosition] || 0) + 1;
      if (obj[0]?.win) {
        wins[obj[0]?.championName] = (wins[obj[0]?.championName] || 0) + 1;
      }
      if (!game[obj[0]?.championName]) {
        game[obj[0]?.championName] = [obj[0]];
      } else {
        game[obj[0]?.championName].push(obj[0]);
      }
    });
    const countPairs = Object.entries(counts);
    countPairs.sort((a, b) => b[1] - a[1]);

    const topThreeCounts = countPairs.slice(0, 4);
    const topThreeNames = topThreeCounts.map(([name, count]) => {
      const winCount = wins[name] || 0;
      return { name, count, winCount, game };
    });

    setRoles(roles);

    setTopThree(topThreeNames);
  }, [playerGames]);

  const rolesCount = () => {
    let sum = 0;
    if (roles?.["BOTTOM"]) sum += roles?.["BOTTOM"];
    if (roles?.["TOP"]) sum += roles?.["TOP"];
    if (roles?.["JUNGLE"]) sum += roles?.["JUNGLE"];
    if (roles?.["MIDDLE"]) sum += roles?.["MIDDLE"];
    if (roles?.["UTILITY"]) sum += roles?.["UTILITY"];
    return sum;
  };

  const calculateChampWins = (games) => {
    let wins = 0;
    for (let i = 0; i < games?.length; i++) {
      if (games[i]?.win) {
        wins++;
      }
    }
    return wins;
  };

  const calculateChampsKills = (games) => {
    let kills = 0;
    for (let i = 0; i < games.length; i++) {
      kills += games[i]?.kills;
    }
    return kills;
  };

  const calculateChampsDeaths = (games) => {
    let deaths = 0;
    for (let i = 0; i < games.length; i++) {
      deaths += games[i]?.deaths;
    }
    return deaths;
  };
  const calculateChampsAssists = (games) => {
    let assists = 0;
    for (let i = 0; i < games.length; i++) {
      assists += games[i]?.assists;
    }
    return assists;
  };

  const calculateChampKda = (games) => {
    return `${((calculateChampsKills(games) + calculateChampsAssists(games)) / calculateChampsDeaths(games)).toFixed(2)}`;
  };

  const kdaTextColor = (kda) => {
    let color;
    switch (true) {
      case kda < 2.5:
        color = "grey";
        break;
      case kda > 2.5 && kda < 3.5:
        color = "green";
        break;
      case kda > 3.5 && kda < 4.5:
        color = "blue";
        break;
      case kda > 4.5:
        color = "orange";
        break;
      default:
        color = "gray";
        break;
    }
    return color;
  };

  return (
    <>
      {hasMatchHistory ? (
        <>
          <Row justify={"center"}>
            <h3 style={{ textAlign: "center" }} className="michroma-font-white">
              Recent 10 Games played stats
            </h3>
          </Row>
          <Row style={{ paddingTop: "3%" }}>
            <Col
              span={3}
              className="flex-center michroma-font-white"
              style={{ flexDirection: "column" }}
            >
              <div style={{ marginBottom: "2%" }}>
                <b>
                  W {calculateGamesWon()} - {10 - calculateGamesWon()} L
                </b>
              </div>
              <Progress
                className="progress-text"
                strokeWidth={12}
                trailColor="red"
                type="circle"
                percent={((calculateGamesWon() / 10) * 100).toFixed(0)}
                width={120}
              />
            </Col>
            <Col
              span={7}
              className="flex-center michroma-font-white"
              style={{ flexDirection: "column" }}
            >
              <div>K D A</div>
              <div style={{ fontSize: "16px" }}>
                {(calculatePlayerKills() / 10).toFixed(1)} /{" "}
                <span className="red-text">
                  {(calculatePlayerDeaths() / 10).toFixed(1)}
                </span>{" "}
                / {(calculatePlayerAssists() / 10).toFixed(1)}
              </div>
              <div style={{ fontSize: "18px" }}>
                <b>
                  {(
                    (calculatePlayerKills() + calculatePlayerAssists()) /
                    calculatePlayerDeaths()
                  ).toFixed(2)}{" "}
                  : 1
                </b>
              </div>
            </Col>
            <Col span={7} style={{ paddingTop: "0%" }}>
              <Row justify={"center"} style={{ paddingBottom: "5%" }}>
                <h3 className="michroma-font-white" style={{ margin: "0%" }}>
                  Most played champions
                </h3>
              </Row>
              {topThree?.map((champ, i) => {
                let singleChamp = champ?.game?.[champ?.name]?.[0];
                let champGames = champ?.game?.[champ?.name];
                let numberOfGames = champ?.game?.[champ?.name]?.length;
                return (
                  <React.Fragment key={i}>
                    <Row style={{ paddingBottom: "5%" }}>
                      <Col
                        span={8}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          alt=""
                          style={{ borderRadius: "50%" }}
                          width={25}
                          src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${singleChamp?.championName}.png`}
                        />
                        <span
                          style={{
                            paddingLeft: "5%",
                            color:
                              ((calculateChampWins(champGames) / numberOfGames) * 100).toFixed(0) >= 75
                                ? "red"
                                : "white",
                              }}
                        >
                          {(
                            (calculateChampWins(champGames) / numberOfGames) * 100).toFixed(0)}{" "}%
                        </span>
                      </Col>
                      <Col span={12} style={{display: "flex", alignItems: "center", justifyContent: "space-around", color: "white"}}>
                        <div>
                          ({calculateChampWins(champGames)}W{" "}
                          {numberOfGames - calculateChampWins(champGames)}L)
                        </div>
                        <div style={{ fontWeight: "bold", color: kdaTextColor(calculateChampKda(champGames))}}>
                          {calculateChampKda(champGames)} KDA
                        </div>
                      </Col>
                    </Row>
                  </React.Fragment>
                );
              })}
            </Col>
            <Col span={7}>
              <Row justify={"center"}>
                <h3 className="michroma-font-white" style={{ margin: "0%" }}>
                  Prefered roles
                </h3>
              </Row>
              <Row>
                <Col span={3}>
                  <img
                    src="https://s-lol-web.op.gg/images/icon/icon-position-top.svg?v=1676864341669"
                    alt=""
                  />
                </Col>
                <Col span={21}>
                  <Progress
                    strokeWidth={12}
                    showInfo={false}
                    percent={(
                      ((roles?.["TOP"] || 0) / rolesCount()) *
                      100
                    )?.toFixed(0)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <img
                    src="https://s-lol-web.op.gg/images/icon/icon-position-jungle.svg?v=1676864341669"
                    alt=""
                  />
                </Col>
                <Col span={21}>
                  <Progress
                    strokeWidth={12}
                    showInfo={false}
                    percent={(
                      ((roles?.["JUNGLE"] || 0) / rolesCount()) *
                      100
                    )?.toFixed(0)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <img
                    src="https://s-lol-web.op.gg/images/icon/icon-position-mid.svg?v=1676864341669"
                    alt=""
                  />
                </Col>
                <Col span={21}>
                  <Progress
                    strokeWidth={12}
                    showInfo={false}
                    percent={(
                      ((roles?.["MIDDLE"] || 0) / rolesCount()) *
                      100
                    )?.toFixed(0)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <img
                    src="https://s-lol-web.op.gg/images/icon/icon-position-adc.svg?v=1676864341669"
                    alt=""
                  />
                </Col>
                <Col span={21}>
                  <Progress
                    strokeWidth={12}
                    showInfo={false}
                    percent={(
                      ((roles?.["BOTTOM"] || 0) / rolesCount()) *
                      100
                    )?.toFixed(0)}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={3}>
                  <img
                    src="https://s-lol-web.op.gg/images/icon/icon-position-support.svg?v=1676864341669"
                    alt=""
                  />
                </Col>
                <Col span={21}>
                  <Progress
                    strokeWidth={12}
                    showInfo={false}
                    percent={(
                      ((roles?.["UTILITY"] || 0) / rolesCount()) *
                      100
                    )?.toFixed(0)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        !isLoading && <Empty style={{ marginTop: "3%" }} />
      )}
    </>
  );
};

export default Overall;
