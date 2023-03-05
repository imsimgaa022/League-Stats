export const renderAvatarIcon = (summonerLevel) => {
    let borderLevel;
    console.log(summonerLevel)
    switch (true) {
        case summonerLevel < 30:
            borderLevel = 1
            break;
        case summonerLevel >= 30 && summonerLevel < 50:
            borderLevel = 30;
            break;
        case summonerLevel >= 50 && summonerLevel < 75:
            borderLevel = 50;
            break;
        case summonerLevel >=  75 && summonerLevel < 100:
            borderLevel =  75;
            break;
        case summonerLevel >= 100 && summonerLevel < 125:
            borderLevel = 100;
            break;
        case summonerLevel >= 125 && summonerLevel < 150:
            borderLevel = 125;
            break;
        case summonerLevel >= 150 && summonerLevel < 175:
            borderLevel = 150;
            break;
        case summonerLevel >= 175 && summonerLevel < 200:
            borderLevel = 175;
            break;
        case summonerLevel >= 200 && summonerLevel < 225:
            borderLevel = 200;
            break;
        case summonerLevel >= 225 && summonerLevel < 250:
            borderLevel = 225;
            break;
        case summonerLevel >= 250 && summonerLevel < 275:
            borderLevel = 250;
            break;
        case summonerLevel >= 275 && summonerLevel < 300:
            borderLevel = 275;
            break;
        case summonerLevel >= 300 && summonerLevel < 325:
            borderLevel = 300;
            break;
        case summonerLevel >= 325 && summonerLevel < 350:
            borderLevel = 325;
            break;
        case summonerLevel >= 350 && summonerLevel < 375:
            borderLevel = 350;
            break;
        case summonerLevel >= 375 && summonerLevel < 400:
            borderLevel = 375;
            break;
        case summonerLevel >= 400 && summonerLevel < 425:
            borderLevel = 400;
            break;
        case summonerLevel >= 425 && summonerLevel < 450:
            borderLevel = 425;
            break;
        case summonerLevel >= 475 && summonerLevel < 500:
            borderLevel = 475;
            break;
        case summonerLevel >= 500:
            borderLevel = 500;
            break;
        default:
            break;
    }
    return `https://res.cloudinary.com/mistahpig/image/upload/v1621882189/league-stats/borders/lvl${borderLevel}.png`
}