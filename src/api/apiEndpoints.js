import axios from "axios";

const APP_URL = "https://stats-server-weld.vercel.app/"

class RiotApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getItemData(version) {
    const response = await axios.get(`${APP_URL}api/itemdata/${version}`);
    return response.data;
  };

  async getPatchVersion() {
    const response = await axios.get(`${APP_URL}api/patchversion`);
    return response;
  }

  getChallangerQue = async (que, league, region) => {
    const response = await axios.get(`${APP_URL}api/challengerleague/${que}/${league}/${region}`)
    return response.data;
  }

  getPlayerLiveGame = async (summonerId, region) => {
    const response = await axios.get(`${APP_URL}api/playerlivegame/${summonerId}/${region}`)
    return response.data
  }

  getSummonerSpells = async (version) => {
    const response = await axios.get(`${APP_URL}api/summonerspells/${version}`)
    return response.data
  }


   fetchAllData = async (summonerName, region) => {
     const response = await axios.get(`${APP_URL}api/fetchalldata/${summonerName}/${region}`)
     return response.data;
  }
}
// eslint-disable-next-line
export default new RiotApiService();
