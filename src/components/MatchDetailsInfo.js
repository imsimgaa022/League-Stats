import { Button, Row, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";

const MatchDetailsInfo = ({
  summoner,
  summonerName,
  isLoading,
  singleGame,
  summonerNames,
  setSummonerNames,
  playedWith,
  setPlayedWith,
}) => {
  // const [playedWith, setPlayedWith] = useState([]);
  const [topThree, setTopThree] = useState([]);

  let hasMatchHistory = !!singleGame?.length;

  console.log(summonerNames);

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

  const dataSource = topThree;
  const columns = [
    {
      title: "Summoner",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Played",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "W - L",
      dataIndex: "winCount",
      key: "winCount",
      render: (_, item) => (
        <span>
          {item?.winCount} - {item?.count - item?.winCount}
        </span>
      ),
    },
    {
      title: "Win ratio",
      dataIndex: "winCount",
      key: "winCount",
      render: (_, item) => (
        <span>{((item?.winCount / item?.count) * 100).toFixed(0)} % </span>
      ),
    },
  ];

  return (
    <>
      <h4 style={{ textAlign: "center" }}>
        Recently Played With (Recent 20 Games)
      </h4>
      {!hasMatchHistory && (
        <>
          {/* <Row justify={"center"}>
                <Button style={{backgroundColor: "purple"}} type='primary' onClick={fetchGames}>Get Stats</Button>
            </Row> */}
          <Row justify={"center"} style={{ paddingTop: "5%" }}>
            <Spin spinning={isLoading} />
          </Row>
        </>
      )}
      {!!topThree.length && (
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      )}
    </>
  );
};

export default MatchDetailsInfo;
