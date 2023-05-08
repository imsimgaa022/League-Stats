import axios from "axios";

const BASE_URL_API = "https://eun1.api.riotgames.com/";
const GET_USER_BY_NAME = "lol/summoner/v4/summoners/by-name/";
const GET_USER_RANKS = "lol/league/v4/entries/by-summoner/";

class RiotApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

   getUserByName = async (summonerName) =>{
    const response = await axios.get(
      `${BASE_URL_API}${GET_USER_BY_NAME}${summonerName}?api_key=${this.apiKey}`
    );
    return response.data;
  }

  async getUserRanks(summonerId) {
    const response = await axios.get(
      `${BASE_URL_API}${GET_USER_RANKS}${summonerId}?api_key=${this.apiKey}`
    );
    return response.data;
  }

  async getMostPlayedChamps(summonerId) {
    const response = await axios.get(
      `${BASE_URL_API}lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/top?api_key=${this.apiKey}`
    );
    return response.data;
  }

  async getMatchIdsByPuuid(puuid) {
    const response = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${this.apiKey}`
    );
    return response.data;
  }

  async getMatchById(matchId) {
    const response = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${this.apiKey}`
    );
    return response.data;
  }

   fetchAllData = async (summonerName) => {
    const user = await this.getUserByName(summonerName);
    const ranks = await this.getUserRanks(user.id);
    const champs = await this.getMostPlayedChamps(user.id);
    const matchIds = await this.getMatchIdsByPuuid(user.puuid);
    const matches = await Promise.all(matchIds.map((id) => this.getMatchById(id)));

    return {
      user,
      ranks,
      champs,
      matches,
    };
  }
}
// eslint-disable-next-line
export default new RiotApiService(process.env.REACT_APP_RIOT_API_KEY);
