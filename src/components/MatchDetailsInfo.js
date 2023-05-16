/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Empty, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";

const MatchDetailsInfo = ({
  summoner,
  summonerName,
  isLoading,
  singleGame,
  summonerNames,
  setSummonerNames,
}) => {
  const [topThree, setTopThree] = useState([]);
  const [playedWith, setPlayedWith] = useState([]);

  let hasMatchHistory = !!singleGame?.length;

  useEffect(() => {
    setSummonerNames([]);
  }, []);

  useEffect(() => {
    singleGame?.forEach((game) => {
      setPlayedWith((prevParticipants) =>
        prevParticipants.concat(game?.info?.participants)
      );
    });
  }, [singleGame]);

  useEffect(() => {
    playedWith?.forEach((summoner) => {
      setSummonerNames((prevParticipants) =>
        prevParticipants.concat({
          name: summoner?.summonerName,
          win: summoner?.win,
        })
      );
    });
  }, [playedWith]);

  useEffect(() => {
    const excludeName = summonerName;
    const counts = {};
    const wins = {};
    summonerNames.forEach((obj) => {
      if (obj.name !== excludeName) {
        counts[obj.name] = (counts[obj.name] || 0) + 1;
        if (obj.win) {
          wins[obj.name] = (wins[obj.name] || 0) + 1;
        }
      }
    });
    const countPairs = Object.entries(counts);
    countPairs.sort((a, b) => b[1] - a[1]);

    const topThreeCounts = countPairs.slice(0, 5);
    const topThreeNames = topThreeCounts.map(([name, count]) => {
      const winCount = wins[name] || 0;
      return { name, count, winCount };
    });

    setTopThree(topThreeNames);
  }, [summonerNames]);

  return (
    <>
      {topThree?.length ? (
        <>
      <h4 style={{ textAlign: "center", color:"white" }}>
        Recently Played With (Recent 10 Games)
      </h4>
      {!hasMatchHistory && (
        <>
          <Row justify={"center"} style={{ paddingTop: "5%" }}>
            <Spin spinning={isLoading} />
          </Row>
        </>
      )}
      <Row className="michroma-font-white">
        <Col span={6}>Summoner</Col>
        <Col span={6}>Games played</Col>
        <Col span={6}>W / L</Col>
        <Col span={6}>Ratio</Col>
      </Row>
      <Row style={{flexDirection:"column"}}>
      {topThree?.map((item, i) => {
        return (
          <React.Fragment key={i}>
          <div className={`${((item?.winCount / item?.count) * 100).toFixed(0) >= 50 ? "green-wr" : "red-wr"}`} style={{display:"flex", alignItems:"center", marginBottom:"3%", padding:"1%", borderRadius:"15px"}}>
            <Col className="michroma-font-white" span={6}>{item?.name}</Col>
            <Col className="michroma-font-white" span={6}>{item?.count}</Col>
            <Col className="michroma-font-white" span={6}>{item?.winCount} - {item?.count - item?.winCount}</Col>
            <Col span={6}><span className="michroma-font-white">{((item?.winCount / item?.count) * 100).toFixed(0)}</span> <span style={{color:"white"}}>%</span> </Col>
          </div>
          </React.Fragment>
        )
      })}
      </Row>
      </>
      ) : (
        <Empty style={{marginTop:"3%"}}></Empty>
      )}
    </>
  );
};

export default MatchDetailsInfo;
