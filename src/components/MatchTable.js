import { Avatar, Badge, Col, Progress, Row, Table, Tooltip } from "antd";
import DOMPurify from "dompurify";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MatchTable = ({ game, summonerName, itemData }) => {
  let navigate = useNavigate();
  const patchVersion = useSelector((state) => state.patchVersion);

  let participants = game?.participants;
  let team1 = participants?.slice(0, 5);
  let team2 = participants?.slice(
    participants?.length - 5,
    participants?.length
  );

  const calculateTeamKills = (team) => {
    let kills = 0;
    for (var i = 0; i < team.length; i++) {
      kills += team[i].kills;
    }
    return kills;
  };
  const calculateTeamGold = (team) => {
    let gold = 0;
    for (var i = 0; i < team.length; i++) {
      gold += team[i].goldEarned;
    }
    return gold;
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

  return (
    <>
      <Table
        rowKey={(record) => record?.summonerName}
        className="table-style"
        bordered={false}
        rowClassName={(record, index) =>
          `${record?.win ? "bg-blue" : "bg-red"} ${
            record?.summonerName === summonerName && "bg-gold" 
          }`
        }
        size="small"
        pagination={false}
        dataSource={team1}
        columns={columns}
      />
      <div className={game?.teams[0]?.win ? "middle-row-color-win" : "middle-row-color-lose"}>
          <Row>
              <Col span={5} className="flex-center">
                  <span style={{paddingRight:"3%"}}>{game?.teams?.[0]?.objectives?.baron?.kills}</span><img alt="" src="https://s-lol-web.op.gg/images/icon/icon-baron-r.svg?v=1676591616266"/>
                  <span style={{paddingLeft:"5%", paddingRight:"3%"}}>{game?.teams?.[0]?.objectives?.dragon?.kills}</span><img alt="" src="https://s-lol-web.op.gg/images/icon/icon-dragon-r.svg?v=1676591616266"/>
                  <span style={{paddingLeft:"5%"}}>{game?.teams?.[0]?.objectives?.tower?.kills}</span><img alt="" src="https://s-lol-web.op.gg/images/icon/icon-tower-r.svg?v=1676591616266"/>
               </Col>
              <Col span={14}>
              <div className="flex-center" style={{ justifyContent: "space-evenly" }}>
          <span>{`(kills)`}{calculateTeamKills(team1)}</span>
          <Progress
            style={{ width: "60%" }}
            className={game?.teams[0]?.win ? "progres-color-win" : "progres-color-lose"}
            strokeColor={game?.teams[0]?.win ? "red" : "blue"}
            showInfo={false}
            percent={100}
            success={{
              percent:
                (calculateTeamKills(team1) /
                  (calculateTeamKills(team1) + calculateTeamKills(team2))) *
                100,
            }}
          />
          <span>{calculateTeamKills(team2)}{`(kills)`}</span>
        </div>
        <div className="flex-center" style={{ justifyContent: "space-evenly" }}>
          <span>{`(gold)`}{calculateTeamGold(team1)}</span>
          <Progress
            style={{ width: "60%" }}
            className={game?.teams[1]?.win ? "progres-color-lose" : "progres-color-win"}
            strokeColor={game?.teams[1]?.win ? "blue" : "red"}
            showInfo={false}
            percent={100}
            success={{
              percent:
                (calculateTeamGold(team1) /
                  (calculateTeamGold(team1) + calculateTeamGold(team2))) *
                100,
            }}
          />
          <span>{calculateTeamGold(team2)}{`(gold)`}</span>
        </div>
              </Col>
              <Col span={5} className="flex-center">
                <span style={{paddingRight:"3%"}}>{game?.teams?.[1]?.objectives?.baron?.kills}</span><img alt="" src="https://s-lol-web.op.gg/images/icon/icon-baron-r.svg?v=1676591616266"/>
                <span style={{paddingLeft:"5%", paddingRight:"3%"}}>{game?.teams?.[1]?.objectives?.dragon?.kills}</span><img alt="" src="https://s-lol-web.op.gg/images/icon/icon-dragon-r.svg?v=1676591616266"/>
                <span style={{paddingLeft:"5%"}}>{game?.teams?.[1]?.objectives?.tower?.kills}</span><img alt="" src="https://s-lol-web.op.gg/images/icon/icon-tower-r.svg?v=1676591616266"/>
              </Col>
          </Row>
      </div>
      <Table
        rowKey={(record) => record?.summonerName}
        className="table-style"
        bordered={false}
        rowClassName={(record, index) =>
          `${record?.win ? "bg-blue" : "bg-red"} ${record?.summonerName === summonerName && "bg-gold"}`
        }
        size="small"
        pagination={false}
        dataSource={team2}
        columns={columns}
      />
    </>
  );
};

export default MatchTable;
