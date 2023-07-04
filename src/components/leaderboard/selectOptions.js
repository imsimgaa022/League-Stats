export const selectOptions = [
  {
    value: "RANKED_SOLO_5x5",
    label: "Solo Que",
  },
  {
    value: "RANKED_FLEX_SR",
    label: "Flex",
  },
];

export const leagueOptions = [
  {
    value: "challenger",
    label: "Challenger",
  },
  {
    value: "grandmaster",
    label: "Grandmaster",
  },
  {
    value: "master",
    label: "Master",
  },
]

const labelDisplay = (region) => {
  let regionTest = ""
  switch (region) {
    case "eune":
      regionTest = "Europe Nordic & East"
      break;
    case "euw":
      regionTest = "Europe West"
      break;
    case "na":
      regionTest = "North America"
      break;
    default:
      regionTest = "Europe Nordic & East"
  }
  return <div style={{display: "flex"}}>
    <img src={`https://s-lol-web.op.gg/assets/images/regions/01-icon-icon-${region}.svg?v=1688436640685`} alt=""/>
    <p style={{margin: "0px", paddingLeft: "5px"}}>{regionTest}</p>
  </div>
}

export const regionOptions=[
  {
    value: 'EUNE',
    label: labelDisplay("eune"),
  },
  {
    value: 'EUW',
    label: labelDisplay("euw"),
  },
  {
    value: 'NA',
    label: labelDisplay("na"),
  },
]