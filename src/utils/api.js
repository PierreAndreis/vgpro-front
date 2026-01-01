import axios from "axios";
import ReactGA from "react-ga";
import MockAPI from "./mockApi";
const http = require("http");
const https = require("https");
const queryString = require("query-string");

// Check if we should use mock data (no API URL configured or explicitly using mock)
const USE_MOCK = true;

const hostname = process.env.REACT_APP_API_URL || "";

const request = axios.create();

request.defaults.baseURL = hostname;
request.defaults.timeout = 10000;
request.defaults.responseType = "json";
request.defaults.httpAgent = new http.Agent({ keepAlive: true });
request.defaults.httpsAgent = new https.Agent({ keepAlive: true });

const errorRequest = e => {
  ReactGA.exception({
    description: `API CALL: ${e}`,
    fatal: true,
  });
  return Error(e);
};

const handleRequest = ({ data, status, ...rest }, timing) => {
  ReactGA.timing({
    category: "API",
    variable: "load",
    value: timing, // in milliseconds
    label: rest.request.responseURL,
  });

  if (status === 200) return data;

  return errorRequest({ status, message: "Failed silently..." });
};

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
};

const API = {};

API.getProFeed = () => {
  if (USE_MOCK) return MockAPI.getProFeed();
  return sendRequest("/pro/history/");
};

API.getLead5 = (mode, region, { player, ...filtersArgs }) => {
  if (USE_MOCK)
    return MockAPI.getLead5(mode, region, { player, ...filtersArgs });
  let f = filtersArgs;
  const filters = queryString.stringify(f);
  if (!player) {
    return sendRequest(`/leaderboard/${mode}/${region}?${filters}`);
  }
  return sendRequest(
    `/leaderboard/${mode}/${region}/${player}?${filters}`
  );
};

API.getTopHeroes = (region = "all") => {
  if (USE_MOCK) return MockAPI.getTopHeroes(region);
  return sendRequest(`/heroes/${region}`);
};

API.getHero = (heroName, region = "all") => {
  if (USE_MOCK) return MockAPI.getHero(heroName, region);
  return sendRequest(`/heroes/${region}/${heroName}`);
};

API.getHeroHistory = (heroName, options) => {
  if (USE_MOCK) return MockAPI.getHeroHistory(heroName, options);
  let region = options.region || "all";
  delete options.region;
  let filters = queryString.stringify(options);

  return sendRequest(`/heroes/${region}/${heroName}/history?${filters}`);
};

/* ==== PLAYER LOOKUP ===== */
API.lookupPlayer = playerName => {
  if (USE_MOCK) return MockAPI.lookupPlayer(playerName);
  return sendRequest(`/player/${playerName}/find`);
};

API.lookupPlayerId = playerId => {
  if (USE_MOCK) return MockAPI.lookupPlayerId(playerId);
  return sendRequest(`/player/${playerId}/uuid/find`);
};

API.fetchPlayerStats = (playerName, filtersArgs) => {
  if (USE_MOCK) return MockAPI.fetchPlayerStats(playerName, filtersArgs);
  let f = filtersArgs;

  const filters = queryString.stringify(f);

  return sendRequest(`/player/${playerName}/stats?${filters}`);
};

API.fetchPlayerMatches = (playerName, filtersArgs) => {
  if (USE_MOCK)
    return MockAPI.fetchPlayerMatches(playerName, {
      limit: 10,
      ...filtersArgs,
    });
  let f = {
    limit: 10,
    ...filtersArgs,
  };

  const filters = queryString.stringify(f);

  return sendRequest(`/matches/${playerName}?${filters}`);
};

/* ===== MATCH ===== */
API.matchDetails = (matchId, region) => {
  if (USE_MOCK) return MockAPI.matchDetails(matchId, region);
  return sendRequest(`/matches/${matchId}/${region}/details`);
};

API.matchTelemetry = (matchId, region) => {
  if (USE_MOCK) return MockAPI.matchTelemetry(matchId, region);
  return sendRequest(`/matches/${matchId}/${region}/telemetry`);
};

export default API;
