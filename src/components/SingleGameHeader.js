import { Avatar, Badge, Col, Divider, Row, Tag, Tooltip } from "antd";
import DOMPurify from "dompurify";
import React from "react";
import { useSelector } from "react-redux";

const SingleGameHeader = ({ game, summonerName, playerStats, itemData }) => {
  const patchVersion = useSelector((state) => state.patchVersion);

  let team1 = game?.participants?.slice(0, 5);
  let team2 = game?.participants?.slice(
    game?.participants?.length - 5,
    game?.participants?.length
  );

  const renderKillTags = () => {
    if (playerStats?.pentaKills) {
      return <Tag color="#f50">Penta kill</Tag>
    } else if (playerStats?.quadraKills) {
      return <Tag color="#f50">Quadra kill</Tag>
    } else if (playerStats?.tripleKills) {
      return <Tag color="#f50">Triple kill</Tag>
    } else if (playerStats?.doubleKills) {
      return <Tag color="#f50">Double kill</Tag>
    }
  }

  const calculateTotalKills = (team) => {
    let gold = 0;
    for (var i = 0; i < team.length; i++) {
      gold += team[i].kills;
    }
    return gold;
  }

  const isInTeamOne = () =>{
    let inTeam1 = team1.find(
      (object) => object === playerStats
    );
    return !!inTeam1;
  }

  const calucalteKP = () =>{
    let totalKillsInTeam;
    let killParticipation;
    totalKillsInTeam = isInTeamOne() ? calculateTotalKills(team1) : calculateTotalKills(team2);
    killParticipation = (((playerStats?.kills+playerStats?.assists) / totalKillsInTeam) * 100).toFixed(1);
    return killParticipation;
  };

  const daysPassed = (timeStamp) => {
    let previousDate = new Date(timeStamp);
    let timeDifferenceInMilliseconds = Date.now() - previousDate.getTime();
    let daysPassed = Math.floor(timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000));

    return daysPassed;
  };

  const renderDay = (timeStamp) => {
    let daysAgo = daysPassed(timeStamp);
    let string;
    switch (daysAgo) {
      case 0:
        string = "Today"
        break;
      case 1: 
        string = "Yesterday"
        break;
      default:
        string = `${daysAgo} days ago`
        break;
      }
    return string;
  }

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

  const playerItemsIds = [
    playerStats?.item0,
    playerStats?.item1,
    playerStats?.item2,
    playerStats?.item3,
    playerStats?.item4,
    playerStats?.item5,
    playerStats?.item6,
  ];

  return (
    <>
      <Row style={{color:"white"}}>
        <Col span={4} className="michroma-font">
          <div
            className={`${playerStats?.win ? "win-word" : "defeat-word"}`}
            style={{ margin: "0" }}
          >
            {game?.gameMode}
          </div>
          <div style={{ margin: "0" }}>{renderDay(game?.gameEndTimestamp)}</div>
          <div style={{ margin: "0", width: "70%" }}><Divider style={{margin:"5px"}}/></div>
          <div style={{ margin: "0", fontWeight:"bold" }}>
            {playerStats?.win ? "Victory" : "Defeat"}
          </div>
          <div style={{ margin: "0" }}>
            {(game?.gameDuration / 60).toFixed(0)}min
          </div>
        </Col>
        <Col span={8}>
          <div className="flex-center" style={{justifyContent: "left"}}> 
            <Badge offset={[-35, 0]} count={playerStats?.champLevel}>
              <Avatar
                size={70}
                src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${playerStats?.championName}.png`}
              />
            </Badge>
            <div style={{paddingLeft:"15%"}}>
            <p style={{margin:"0px", fontWeight:"bold"}}>{playerStats?.kills} / <span style={{color:"red"}}>{playerStats?.deaths}</span> / {playerStats?.assists}</p>
            <p style={{margin:"0px"}}>{((playerStats?.kills + playerStats?.assists)/ playerStats?.deaths).toFixed(2)}:1 KDA</p>
            {renderKillTags()}
            </div>
          </div>
          <div style={{display:"flex"}}>
              {playerItemsIds.map((item, i) => {
                return (
                  <Tooltip zIndex={"9999"} title={tooltip(item)} key={i}>
                    <Avatar size={25} style={{marginRight:"2%"}} shape={`${i !== 6 ? "square" : ""}`} src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/item/${item}.png`}/>
                  </Tooltip>
                )  
              })}
            </div>
        </Col>
        <Col span={5}>
          <p style={{color:"red", margin:"0px"}}>P/Kill {calucalteKP()}%</p>
          <p>Control Ward {playerStats?.visionWardsBoughtInGame}</p>
          <p style={{margin:"0px"}}>{`CS ${playerStats?.totalMinionsKilled + playerStats?.neutralMinionsKilled} (${((playerStats?.totalMinionsKilled + playerStats?.neutralMinionsKilled) / Math.floor((playerStats?.timePlayed / 60))).toFixed(1)})`}</p>
        </Col>
        <Col span={7}>
          <div style={{display:"flex"}}>
            <div style={{width:"50%"}}>
              {team1?.map((player, index)=>{
                return (
                  <div key={index} className="text-truncate"><Avatar size={20} style={{marginRight:"2%"}} shape="square" src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${player?.championName}.png`}/>{player?.summonerName}</div>
                )
              })}
            </div>
            <div style={{width:"50%"}}>
              {team2?.map((player, index)=>{
                return (
                  <div key={index} className="text-truncate"><Avatar size={20} style={{marginRight:"2%"}} shape="square" src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${player?.championName}.png`}/>{player?.summonerName}</div>
                )
              })}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SingleGameHeader;
