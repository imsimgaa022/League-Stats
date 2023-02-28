import { Avatar, Badge, Col, Divider, Row, Tag } from "antd";
import React from "react";

const SingleGameHeader = ({ game, summonerName, playerStats }) => {

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

  return (
    <>
      <Row>
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
                src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${playerStats?.championName}.png`}
              />
            </Badge>
            <div style={{paddingLeft:"15%"}}>
            <p style={{margin:"0px", fontWeight:"bold"}}>{playerStats?.kills} / <span style={{color:"red"}}>{playerStats?.deaths}</span> / {playerStats?.assists}</p>
            <p style={{margin:"0px"}}>{((playerStats?.kills + playerStats?.assists)/ playerStats?.deaths).toFixed(2)}:1 KDA</p>
            {renderKillTags()}
            </div>
          </div>
          <div style={{display:"flex"}}>
                <Avatar size={25} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item0}.png`}/>
                <Avatar size={25} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item1}.png`}/>
                <Avatar size={25} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item2}.png`}/>
                <Avatar size={25} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item3}.png`}/>
                <Avatar size={25} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item4}.png`}/>
                <Avatar size={25} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item5}.png`}/>
                <Avatar size={25} style={{marginRight:"2%"}} src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${playerStats?.item6}.png`}/>
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
                  <div key={index} className="text-truncate"><Avatar size={20} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player?.championName}.png`}/>{player?.summonerName}</div>
                )
              })}
            </div>
            <div style={{width:"50%"}}>
              {team2?.map((player, index)=>{
                return (
                  <div key={index} className="text-truncate"><Avatar size={20} style={{marginRight:"2%"}} shape="square" src={`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${player?.championName}.png`}/>{player?.summonerName}</div>
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
