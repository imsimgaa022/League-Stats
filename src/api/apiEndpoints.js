import axios from "axios";

const APP_URL = "https://stats-server-weld.vercel.app/"

class RiotApiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getItemData() {
    const response = await axios.get(`${APP_URL}api/itemdata`);
    return response.data;
  };

  async getPatchVersion() {
    const response = await axios.get(`${APP_URL}api/patchversion`);
    return response;
  }

  getChallangerQue = async (que, league) => {
    const response = await axios.get(`${APP_URL}api/challengerleague/${que}/${league}`)
    return response.data;
  }

  getPlayerLiveGame = async (summonerId) => {
    const response = await axios.get(`${APP_URL}api/playerlivegame/${summonerId}`)
    return response.data
  }

  getSummonerSpells = async (version) => {
    const response = await axios.get(`${APP_URL}api/summonerspells/${version}`)
    return response.data.data
  }


   fetchAllData = async (summonerName) => {
     const response = await axios.get(`${APP_URL}api/fetchalldata/${summonerName}`)
     return response.data;
  }
}
// eslint-disable-next-line
export default new RiotApiService();
