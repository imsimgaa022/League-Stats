import React from "react";
import { Collapse } from "antd";
import MatchTable from "./MatchTable";
import SingleGameHeader from "./SingleGameHeader";
import { useSelector } from "react-redux";

const SingleGame = ({ game, summonerName, queTypes }) => {

  const { Panel } = Collapse;
  const itemData = useSelector((state) => state.items);
  let playerStats = game?.participants?.find(
    (object) => object.summonerName === summonerName
  );
  return (
    <>
      <Collapse
        style={{ marginBottom: "2%", borderLeft: playerStats?.win ? "10px solid blue" : "10px solid red", marginTop:"2%" }}
        expandIconPosition="end"
        accordion
        className={`collapse-padding high-arrow ${playerStats?.win ? "copalpse-bg-win" : "copalpse-bg-lose"} `}
      >
        <Panel
          style={{color:"white"}}
          header={
            <SingleGameHeader
              playerStats={playerStats}
              game={game}
              summonerName={summonerName}
              itemData={itemData}
              queTypes={queTypes}
            />
          }
          key={game?.gameId}
        >
          <MatchTable itemData={itemData} game={game} summonerName={summonerName} />
        </Panel>
      </Collapse>
    </>
  );
};

export default SingleGame;
