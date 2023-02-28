import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import SingleGame from "./SingleGame";
import { Spin } from 'antd';

export const MatchHistory = ({ summonerName, summoner, matchList, isLoading, fetchGames, singleGame }) => {
  const [gameCount, setGameCount] = useState(4);

    const onLoadMore = () => {
      setGameCount(gameCount + 4);
      fetchGames();
    }

  return (
    <>
      {isLoading ? (<Spin spinning={true}/>) : (

      <div>
          {singleGame?.map((game, index)=>{
            return (
              <>
                <SingleGame 
                key={index}
                setGameCount={setGameCount}
                fetchGames={fetchGames}
                game={game?.info}
                summonerName={summonerName}/>
              </>
            )
          })}
      </div>
      )}
    </>
  );
};
