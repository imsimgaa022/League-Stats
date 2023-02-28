import React from "react";
import { Collapse } from "antd";
import MatchTable from "./MatchTable";
import SingleGameHeader from "./SingleGameHeader";
import LeftOutlined from "@ant-design/icons";

const SingleGame = ({ game, summonerName, fetchGames, setGameCount }) => {

  const { Panel } = Collapse;
  let playerStats = game?.participants?.find(
    (object) => object.summonerName === summonerName
  );
  return (
    <>
      <Collapse
        style={{ marginBottom: "2%", borderLeft: playerStats?.win ? "10px solid blue" : "10px solid red", marginTop:"2%" }}
        expandIconPosition="end"
        accordion
        className="collapse-padding"
      >
        <Panel
          style={{ backgroundColor: playerStats?.win ? "#ecf2ff" : "#fff0f3" }}
          header={
            <SingleGameHeader
              playerStats={playerStats}
              game={game}
              summonerName={summonerName}
            />
          }
          key={game?.gameId}
        >
          <MatchTable game={game} summonerName={summonerName} />
        </Panel>
      </Collapse>
    </>
  );
};

export default SingleGame;
