import React, { useEffect, useState } from "react";
import SingleGame from "./SingleGame";
import { Spin } from 'antd';
import axios from "axios";

export const MatchHistory = ({ summonerName, summoner, matchList, isLoading, fetchGames, singleGame }) => {
  const [queTypes, setQueTypes] = useState(null);

  useEffect (() => {
    const getQueType = async () => {
      const response = await axios.get("https://static.developer.riotgames.com/docs/lol/queues.json")
      setQueTypes(response?.data);
    }
    getQueType();
  }, [])

  return (
    <>
      {isLoading ? (<Spin spinning={true}/>) : (

      <div>
          {singleGame?.map((game, index)=>{
            return (
              <React.Fragment key={index}>
                <SingleGame
                queTypes={queTypes}
                key={index}
                fetchGames={fetchGames}
                game={game?.info}
                summonerName={summonerName}/>
              </React.Fragment>
            )
          })}
      </div>
      )}
    </>
  );
};
