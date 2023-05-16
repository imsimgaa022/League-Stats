import { Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import AnalysisStat from "./AnalysisStat";

const TeamAnalysis = ({
  team1,
  team2,
  calculateTeamStat,
  calculateTeamGold,
}) => {
  const patchVersion = useSelector((state) => state.patchVersion);
  let team1Kills = calculateTeamStat(team1, "kills");
  let team2Kills = calculateTeamStat(team2, "kills");
  let team1Gold = calculateTeamStat(team1, "goldEarned");
  let team2Gold = calculateTeamStat(team2, "goldEarned");
  let team1Damage = calculateTeamStat(team1, "totalDamageDealtToChampions");
  let team2Damage = calculateTeamStat(team2, "totalDamageDealtToChampions");
  let team1DamageTaken = calculateTeamStat(team1, "totalDamageTaken");
  let team2DamageTaken = calculateTeamStat(team2, "totalDamageTaken");
  let team1Won = team1?.[0]?.win;
  let team2Won = team2?.[0]?.win;

  const maxStatInTeam = (list, stat) => {
    let max = list[0]?.[stat];
    for (let i = 1; i < list.length; i++) {
      if (list[i]?.[stat] > max) {
        max = list[i]?.[stat];
      }
    }
    return max;
  };

  const maxKills = maxStatInTeam([...team1, ...team2], "kills");
  const maxGold = maxStatInTeam([...team1, ...team2], "goldEarned");
  const maxDamage = maxStatInTeam([...team1, ...team2], "totalDamageDealtToChampions");
  const maxDamageTaken = maxStatInTeam([...team1, ...team2], "totalDamageTaken");

  return (
    <>
      <Row justify={"center"} style={{ marginTop: "1%" }}>
        <div style={{ color: "blue" }}>Winning Team</div>
        <div>|</div>
        <div style={{ color: "red" }}>Losing Team</div>
      </Row>
      <Row style={{ marginTop: "1%" }}>
        <AnalysisStat
          stat={"kills"}
          patchVersion={patchVersion}
          team1Won={team1Won}
          team2Won={team2Won}
          team1={team1}
          team2={team2}
          team1Stat={team1Kills}
          team2Stat={team2Kills}
          max={maxKills}
        />
        <AnalysisStat
          stat={"goldEarned"}
          patchVersion={patchVersion}
          team1Won={team1Won}
          team2Won={team2Won}
          team1={team1}
          team2={team2}
          team1Stat={team1Gold}
          team2Stat={team2Gold}
          max={maxGold}
        />
      </Row>
      <Row style={{margin:"3% 0%"}}>
        <AnalysisStat
          stat={"totalDamageDealtToChampions"}
          patchVersion={patchVersion}
          team1Won={team1Won}
          team2Won={team2Won}
          team1={team1}
          team2={team2}
          team1Stat={team1Damage}
          team2Stat={team2Damage}
          max={maxDamage}
        />
        <AnalysisStat
          stat={"totalDamageTaken"}
          patchVersion={patchVersion}
          team1Won={team1Won}
          team2Won={team2Won}
          team1={team1}
          team2={team2}
          team1Stat={team1DamageTaken}
          team2Stat={team2DamageTaken}
          max={maxDamageTaken}
        />
      </Row>
    </>
  );
};

export default TeamAnalysis;
