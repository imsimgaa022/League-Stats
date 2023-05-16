import { Avatar, Badge, Progress, Tabs, Tooltip } from "antd";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScoreBoardTable from "./ScoreBoardTable";
import TeamAnalysis from "./TeamAnalysis";

const MatchTable = ({ game, summonerName, itemData }) => {
  let navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("1");
  const patchVersion = useSelector((state) => state.patchVersion);

  let participants = game?.participants;
  let team1 = participants?.slice(0, 5);
  let team2 = participants?.slice(
    participants?.length - 5,
    participants?.length
  );

  const calculateTeamStat = (team, stat) => {
    let count = 0;
    for (var i = 0; i < team.length; i++) {
      count += team[i]?.[stat];
    }
    return count;
  };

  const maxDamgeInTeam = (list) => {
    let max = list[0]?.totalDamageDealtToChampions;
    for (let i = 1; i < list.length; i++) {
      if (list[i]?.totalDamageDealtToChampions > max) {
        max = list[i]?.totalDamageDealtToChampions;
      }
    }
    return max;
  }

  const kdaTextColor = (kda) => {
    let color;
    switch (true) {
      case kda < 2.5:
        color = "grey"
        break;
      case kda > 2.5 && kda < 3.5:
        color = "green"
        break;
      case kda > 3.5 && kda < 4.5:
        color = "blue"
        break;
      case kda > 4.5:
        color = "orange"
        break;
      default:
        color = "gray"
        break;
    }
    return color;
  };

  const createHtml =(description) => {
    let sanitizedHTML = DOMPurify.sanitize(description);
    let html = { __html: sanitizedHTML };
    return html;
  }

  const tooltip = (itemId) => {
    const itemName = (itemData?.[itemId]?.name)
    const itemDescription = createHtml(itemData?.[itemId]?.description);
    return (
      <>
        <div style={{textAlign:"center"}}>
          <h4 style={{fontWeight:"bold"}}>{itemName}</h4>
          <p dangerouslySetInnerHTML={itemDescription}></p>
        </div>
      </>
    )
  };

  const handleUserClick = (summoner) => {
    navigate(`/home/summoner/${summoner}`);
  };

  const columns = [
    {
      dataIndex: "Player",
      key: "Player",
      render: (_, item) => {
        return (
          <>
            <Badge size="small" offset={[0,30]} count={item?.champLevel}>
              <Avatar
                size={30}
                shape="square"
                src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${item?.championName}.png`}
              />
            </Badge>
          </>
        );
      },
    },
    {
      title: "Player",
      dataIndex: "Player",
      key: "Player",
      render: (_, item) => {
        return (
          <>
            <p style={{ margin: "0", textAlign:"center", cursor:"pointer" }}><b onClick={() => handleUserClick(item?.summonerName)}>{item?.summonerName}</b></p>
            <p style={{ margin: "0", textAlign:"center" }}>Level {item?.summonerLevel}</p>
          </>
        );
      },
    },
    {
      title: "KDA",
      dataIndex: "kda",
      key: "kda",
      render: (_, item) => {
        return (
          <span className="mb-0 payment-columns">
            {item?.kills} / <span className="red-text">{item?.deaths}</span> / {item?.assists}
            <p style={{margin:"0px", color:kdaTextColor(((item?.kills + item?.assists)/ item?.deaths).toFixed(2))}}>
              <b>{((item?.kills + item?.assists)/ item?.deaths).toFixed(2)} : 1</b>
            </p>
          </span>
        );
      },
    },
    {
      title: "Damage",
      dataIndex: "Damage",
      key: "Damage",
      render: (_, item) => {
          return (
              <>
              <p style={{margin:"0", textAlign:"center"}}>{item?.totalDamageDealtToChampions}</p>
              <Progress strokeColor={`${item?.win ? "blue" : "red"}`} percent={item?.totalDamageDealtToChampions / maxDamgeInTeam(participants) * 100} className="flex-center" showInfo={false} style={{width:"100%", padding:"0% 10%"}}/>
              </>
          )
      }
    },
    {
      title: "Wards",
      dataIndex: "Wards",
      key: "Wards",
      render: (_, item) => {
          return (
              <p className="text-center">{item?.wardsPlaced} / {item?.wardsKilled}</p>
          )
      }
    },
    {
        title: "CS",
        dataIndex: "CS",
        key: "CS",
        render: (_, item) => {
            return (
          <span className="mb-0 payment-columns">
            <p className="text-center">{item?.totalMinionsKilled + item?.neutralMinionsKilled} | {((item?.totalMinionsKilled + item?.neutralMinionsKilled) / Math.floor((item?.timePlayed / 60))).toFixed(1)}/min</p>
          </span>
        );
    },
    },
    {
    title: "Items",
    dataIndex: "Items",
    key: "Items",
    render: (_, item) => {
        const itemIds = [item?.item0, item?.item1, item?.item2, item?.item3, item?.item4, item?.item5, item?.item6];
        return (
          <div style={{ display: 'flex' }}>
            {itemIds.map((itemId, i) => (
              <Tooltip zIndex={"9999"} title={tooltip(itemId)} key={i}>
                <Avatar
                  key={i}
                  style={{ marginRight: '2%' }}
                  shape="square"
                  src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${itemId}.png`}
                />
              </Tooltip>
            ))}
        </div>
        );
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: `Scoreboard`,
      children: (
        <ScoreBoardTable summonerName={summonerName} team1={team1} columns={columns} game={game} calculateTeamStat={calculateTeamStat} team2={team2}/>
      ),
    },
    {
      key: "2",
      label: `Team Analysis`,
      children: (
        <TeamAnalysis game={game} team1={team1} team2={team2} calculateTeamStat={calculateTeamStat}/>
      ),
    },
  ];

  const onChange = (value) => {
    setActiveKey(value);
  };

  return (
    <>
      <Tabs className="match-tabs" activeKey={activeKey} defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default MatchTable;
