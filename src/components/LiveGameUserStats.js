import { Col, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LiveGameUserStats = ({ summonerId, redTeam = false }) => {
  const [userRank, setUserRank] = useState(null);
  const APP_URL = "https://stats-server-weld.vercel.app/"
  let rankUrl = `${APP_URL}api/userranks/${summonerId}`

  useEffect(() => {
    async function fetchRank() {
      const data = await axios.get(rankUrl);
      setUserRank(data.data);
    }
    fetchRank();
  }, [summonerId, rankUrl]);

  const findQueType = (obj, searchValue, key) => {
    for (const objKey in obj) {
      if (obj.hasOwnProperty(objKey)) {
        const innerObj = obj[objKey];
        if (innerObj?.[key] === searchValue) {
          return innerObj;
        }
      }
    }
    return null;
  };

  let soloQstats = findQueType(userRank, "RANKED_SOLO_5x5", "queueType");
  let flexStats = findQueType(userRank, "RANKED_FLEX_SR", "queueType");
  return (
    <>
      <Row align={"middle"} justify="center" style={{flexDirection: redTeam && "row-reverse"}}>
          <Col span={12} className="flex-center" style={{justifyContent:"space-evenly", flexDirection: redTeam && "row-reverse"}}>
              {soloQstats ? (
                  <>
                <div>
                    <img alt="" width={35} src={`/images/rank/Emblem_${soloQstats?.tier}.png`}/>
                </div>
                <div className="text-center">
                <span style={{fontWeight:"bold"}}>{soloQstats?.tier} {soloQstats?.rank}</span>
                    <p style={{margin:"0px"}}><span className="text-win">W {soloQstats?.wins}</span> / <span className="text-lose">{soloQstats?.losses} L</span></p>
                    <p style={{margin:"0px"}}>{`${soloQstats?.leaguePoints} LP`}</p>
                </div>
                </>
              ) : (
                <div>-</div>
              )}
          </Col>
          <Col span={12} className="flex-center" style={{justifyContent:"space-evenly", flexDirection: !redTeam && "row-reverse"}}>
              {flexStats ? (
                <>
                    <div>
                        <img alt="" width={35} src={`/images/rank/Emblem_${flexStats?.tier}.png`}/>
                    </div>
                    <div className="text-center">
                    <span style={{fontWeight:"bold"}}>{flexStats?.tier} {flexStats?.rank}</span>
                        <p style={{margin:"0px"}}><span className="text-win">W {flexStats?.wins}</span> / <span className="text-lose">{flexStats?.losses} L</span></p>
                        <p style={{margin:"0px"}}>{`${flexStats?.leaguePoints} LP`}</p>
                    </div>
                </>
              ) : (
                <div>-</div>
              )}
          </Col>
      </Row>
    </>
  );
};

export default LiveGameUserStats;
