import axios from "axios";
import ReactGA from "react-ga";
const http = require('http');
const https = require('https');
const queryString = require('query-string');

//HARDCODED. CHANGE TO PROCESS FILE
const hostname = "https://api.vgpro.gg";
// const hostname = "http://localhost:8080";

const request = axios.create();

request.defaults.baseURL      = hostname;
request.defaults.timeout      = 10000;
request.defaults.responseType = "json";
request.defaults.httpAgent    =  new http.Agent({ keepAlive: true });
request.defaults.httpsAgent   = new https.Agent({ keepAlive: true });


const errorRequest = (e) => {
  // console.warn(e);
  // throw new Error(e);
  // // return [];
  ReactGA.exception({
    description: `API CALL: ${e}`,
    fatal: true
  });
  return Error(e);
}

const handleRequest = ({data, status, ...rest}, timing) => {

  ReactGA.timing({
    category: 'API',
    variable: 'load',
    value: timing, // in milliseconds
    label: rest.request.responseURL
  });

  if (status === 200) return data;

  return errorRequest({status, message: "Failed silently..."});
}


const sendRequest = async (url, data, method = "get") => {

    const options = {
      url,
      method,
    };

    const startTime = new Date();
    const req = await request(options);
    const endTime = new Date();

    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    const diff = endTime - startTime;

    return handleRequest(req, diff);
}

const API = {};

API.getProFeed = () => {
  return sendRequest("/pro/history/");
}

API.getLead5 = (mode, region, {player, ...filtersArgs}) => {

  let f = filtersArgs;
  const filters = queryString.stringify(f);
  if (!player) {
    return sendRequest(`/leaderboard/${mode}/${region}?${filters}`);
  }
  return sendRequest(`/leaderboard/${mode}/${region}/${player}?${filters}`);

}

API.getTopHeroes = (region = "all") => {
  return sendRequest(`/heroes/${region}`);
}

API.getHero = (heroName, region = "all") => {
  return sendRequest(`/heroes/${region}/${heroName}`);
}

API.getHeroHistory = (heroName, options) => {

  let region = options.region || "all";
  delete options.region;
  let filters = queryString.stringify(options);

  return sendRequest(`/heroes/${region}/${heroName}/history?${filters}`)
}

/* ==== PLAYER LOOKUP ===== */
API.lookupPlayer = (playerName) => {
  return sendRequest(`/player/${playerName}/find`);
}

API.fetchPlayerStats = (playerName, filtersArgs) => {

  let f = filtersArgs;

  const filters = queryString.stringify(f);

  return sendRequest(`/player/${playerName}/stats?${filters}`);
}

API.fetchPlayerMatches = (playerName, filtersArgs) => {

  let f = {
    limit: 10,
    ...filtersArgs
  }

  const filters = queryString.stringify(f);

  return sendRequest(`/matches/${playerName}?${filters}`);
}

/* ===== MATCH ===== */
API.matchDetails = (matchId, region) => {
  return sendRequest(`/matches/${matchId}/${region}/details`);
}

API.matchTelemetry = (matchId, region) => {
  return sendRequest(`/matches/${matchId}/${region}/telemetry`);
}
export default API;
