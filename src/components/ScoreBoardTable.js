import { Col, Progress, Row, Table } from 'antd'
import React from 'react'

const ScoreBoardTable = ({summonerName, team1, columns, game, team2, calculateTeamStat}) => {
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
          <span>{`(kills)`}{calculateTeamStat(team1, 'kills')}</span>
          <Progress
            style={{ width: "60%" }}
            className={game?.teams[0]?.win ? "progres-color-win" : "progres-color-lose"}
            strokeColor={game?.teams[0]?.win ? "red" : "blue"}
            showInfo={false}
            percent={100}
            success={{
              percent:
                (calculateTeamStat(team1, 'kills') /
                  (calculateTeamStat(team1, 'kills') + calculateTeamStat(team2, 'kills'))) *
                100,
            }}
          />
          <span>{calculateTeamStat(team2, 'kills')}{`(kills)`}</span>
        </div>
        <div className="flex-center" style={{ justifyContent: "space-evenly" }}>
          <span>{`(gold)`}{calculateTeamStat(team1, 'goldEarned')}</span>
          <Progress
            style={{ width: "60%" }}
            className={game?.teams[1]?.win ? "progres-color-lose" : "progres-color-win"}
            strokeColor={game?.teams[1]?.win ? "blue" : "red"}
            showInfo={false}
            percent={100}
            success={{
              percent:
                (calculateTeamStat(team1, 'goldEarned') /
                  (calculateTeamStat(team1, 'goldEarned') + calculateTeamStat(team2, 'goldEarned'))) *
                100,
            }}
          />
          <span>{calculateTeamStat(team2, 'goldEarned')}{`(gold)`}</span>
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
  )
}

export default ScoreBoardTable