import { Col, Progress } from 'antd'
import React from 'react'
import { CHAMP_ID_TO_NAME } from '../helpers/champIdToName'

const AnalysisStat = ({team1, team2, team1Won, team2Won, patchVersion, max, stat, team1Stat, team2Stat}) => {

    const renderStat = {
        'kills': 'Kills',
        'goldEarned': 'Gold',
        'totalDamageDealtToChampions': 'Damage dealt',
        'totalDamageTaken': 'Damage taken'
    }

  return (
    <Col span={12}>
        <div className='text-center'><span style={{fontWeight:"bold"}}>{renderStat[stat]}</span></div>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection: team1Won ? "row" : "row-reverse"}}>
            <div style={{width:"100%", padding:"0% 3%"}}>
                {team1.map((item) => (
                    <div style={{display:"flex", padding:"0% 3%", margin:"2% 0%"}}>
                        <img alt="" style={{marginRight:"5%", borderRadius:"35%"}} width={30} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[item?.championId]?.replace(/\s/g, "")}.png`}/>
                        <Progress strokeColor={team1Won ? "blue" : "red"} percent={Math.ceil((item?.[stat] / max) * 100)} showInfo={false}/>
                        <span>{item?.[stat]}</span>
                    </div>
                ))}
            </div>
          <Progress
            strokeColor={team1Won ? "blue" : "red"}
            trailColor={team1Won ? "red" : "blue"}
            style={{ display: "flex", alignItems: "center" }}
            format={(percent) => (
              <div>
                <p style={{color: team1Won ? "blue" : "red", marginBottom:"0px"}}>{team1Stat}</p>
                <hr style={{border:"1px solid purple", margin:"5% 6%"}}/>
                <p style={{color: team2Won ? "blue" : "red", marginTop:"0px"}}>{team2Stat}</p>
              </div>
            )}
            type="circle"
            percent={Math.ceil((team1Stat / (team1Stat + team2Stat)) * 100)}
          />
          <div style={{width:"100%", padding:"0% 3%"}}>
                {team2.map((item) => (
                    <div style={{display:"flex", padding:"0% 3%", margin:"2% 0%"}}>
                        <img alt="" style={{marginRight:"5%", borderRadius:"35%"}} width={30} src={`http://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${CHAMP_ID_TO_NAME[item?.championId]?.replace(/\s/g, "")}.png`}/>
                        <Progress strokeColor={team2Won ? "blue" : "red"} percent={Math.ceil((item?.[stat] / max) * 100)} showInfo={false}/>
                        <span>{item?.[stat]}</span>
                    </div>
                ))}
           </div>
        </div>
        </Col>
  )
}

export default AnalysisStat