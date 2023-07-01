import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHAMP_ID_TO_NAME } from "../helpers/champIdToName";
import { getSummonerSpells } from "../redux/actions";
import LiveGameUserStats from "./LiveGameUserStats";

const LiveGame = ({ liveGame }) => {
  const patchVersion = useSelector((state) => state.patchVersion);
  const summonerSpells = useSelector((state) => state.summonerSpells);
  const dispatch = useDispatch();
  console.log(summonerSpells)

  useEffect(() => {
    const payload = { patchVersion: patchVersion };
    dispatch(getSummonerSpells(payload));
  }, [dispatch, patchVersion]);

  let participants = liveGame?.participants;
  let bannedChampions = liveGame?.bannedChampions;
  let team1 = participants?.slice(0, 5);
  let team2 = participants?.slice(
    participants?.length - 5,
    participants?.length
  );
  const findSummonerSpell = (obj, searchValue, key) => {
    console.log(obj)
    for (const objKey in obj) {
      if (obj.hasOwnProperty(objKey)) {
        const innerObj = obj[objKey]
        // eslint-disable-next-line
        if (innerObj?.[key] == searchValue) {
          return innerObj;
        }
      }
    }
    return null;
  };

  return (
    <>
      <Row>
          <Col className="live-game-div" span={24} style={{justifyContent:"space-evenly"}}>
              <div>
                {bannedChampions?.slice(0,5).map((item) => {
                    if (item?.championId !== -1) {
                        return (
                            <img
                                alt=""
                                className="banned-champion"
                                width={50}
                                src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[item?.championId]?.replace(/\s/g, "")}.png`}
                            />
                        );
                      }
                    return null;
                })}
              </div>
              <div className="flex-center">BANS</div>
              <div className="flex-center">BANS</div>
              <div>
              {bannedChampions?.slice(-5).map((item)=>{
                  if (item?.championId !== -1) {
                    return (
                      <img
                        alt=""
                        className="banned-champion"
                        width={50}
                        src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[item?.championId]?.replace(/\s/g, "")}.png`}
                      />
                    );
                  }
                  return null;
              })}
              </div>
              
          </Col>
      </Row>
      <Row>
        <Col span={12} style={{paddingRight:"0.5%"}}>
            <Row className="live-game-div-blue">
                <Col className="text-center live-summoner" span={6}>Summoner</Col>
                <Col className="text-center live-summoner" span={2}>Champ</Col>
                <Col className="text-center live-summoner" span={2}>Spells</Col>
                <Col className="text-center live-summoner" span={8}>Solo Que</Col>
                <Col className="text-center live-summoner" span={4}>Flex Que</Col>
            </Row>
          {team1?.map((item, i) => (
            <Row className="live-game-div-blue">
              <Col span={6} style={{ display: "flex", alignItems: "center" }}>
                <img
                  width={30}
                  alt=""
                  src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/profileicon/${item?.profileIconId}.png`}
                />
                <div className="text-truncate" style={{ paddingLeft: "10px", fontWeight:"bold" }}>
                  {item?.summonerName}
                </div>
              </Col>
              <Col span={2} style={{display:"flex", alignItems:"center"}}>
                <img alt="" style={{ borderRadius: "50%", border: "1px solid blue" }} width={40} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[item?.championId]?.replace(/\s/g, "")}.png`}
                />
              </Col>
              <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img alt="" width={20} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${findSummonerSpell(summonerSpells, item?.spell1Id, "key")?.id}.png`}/>
                  <img alt="" width={20} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${findSummonerSpell(summonerSpells, item?.spell2Id, "key")?.id}.png`}/>
                </div>
                <div>
                  <img alt="" width={20} src={`https://opgg-static.akamaized.net/meta/images/lol/perk/${item?.perks?.perkIds?.[0]}.png?image=q_auto,f_webp,w_auto&v=1684398721918`}/>
                  <img alt="" width={20} src={`https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${item?.perks?.perkSubStyle}.png?image=q_auto,f_webp,w_auto&v=1684398721918`}/>
                </div>
              </Col>
              <Col span={14}>
                  <LiveGameUserStats summonerId={item?.summonerId}/>
              </Col>
            </Row>
          ))}
        </Col>
        <Col span={12} style={{paddingLeft:"0.5%"}}>
            <Row className="live-game-div-red" style={{flexDirection:"row-reverse"}}>
                <Col className="text-center live-summoner" span={6}>Summoner</Col>
                <Col className="text-center live-summoner" span={2}>Champ</Col>
                <Col className="text-center live-summoner" span={2}>Spells</Col>
                <Col className="text-center live-summoner" span={8}>Solo Que</Col>
                <Col className="text-center live-summoner" span={4}>Flex Que</Col>
            </Row>
          {team2?.map((item, i) => (
            <Row className="live-game-div-red" style={{ flexDirection: "row-reverse" }}>
              <Col span={6} style={{ display: "flex", alignItems: "center", flexDirection: "row-reverse"}}>
                <img alt="" width={30} src={`https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/profileicon/${item?.profileIconId}.png`}/>
                <div className="text-truncate" style={{ paddingRight: "10px", fontWeight:"bold" }}>
                  {item?.summonerName}
                </div>
              </Col>
              <Col span={2} style={{display:"flex", alignItems:"center"}}>
                <img alt="" style={{ borderRadius: "50%", border: "1px solid red" }} width={40} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[item?.championId]?.replace(/\s/g, "")}.png`}/>
              </Col>
              <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <img alt="" width={20} src={`https://opgg-static.akamaized.net/meta/images/lol/perk/${item?.perks?.perkIds?.[0]}.png?image=q_auto,f_webp,w_auto&v=1684398721918`}/>
                  <img alt="" width={20} src={`https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${item?.perks?.perkSubStyle}.png?image=q_auto,f_webp,w_auto&v=1684398721918`}/>
                </div>
                <div>
                  <img alt="" width={20} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${findSummonerSpell(summonerSpells, item?.spell1Id, "key")?.id}.png`}/>
                  <img alt="" width={20} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/spell/${findSummonerSpell(summonerSpells, item?.spell2Id, "key")?.id}.png`}/>
                </div>
              </Col>
              <Col span={14} style={{flexDirection:"row-reverse"}}>
                  <LiveGameUserStats redTeam={true} summonerId={item?.summonerId}/>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default LiveGame;
