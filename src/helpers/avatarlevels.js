export const renderAvatarIcon = (summonerLevel) => {
    let borderLevel = Math.min(500, Math.max(1, Math.floor(summonerLevel / 25) * 25));
    if (summonerLevel < 30) borderLevel = 1;
    if (summonerLevel >= 30 && summonerLevel < 50) borderLevel = 30;

    return `https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl${borderLevel}.png`
  }
  