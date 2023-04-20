export const renderAvatarIcon = (summonerLevel) => {
    const borderLevel = Math.min(500, Math.max(1, Math.floor(summonerLevel / 25) * 25));
    return `https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl${borderLevel}.png`
  }
  