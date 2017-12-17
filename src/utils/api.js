/**
 * todo:
 * better way to make request
 * more dynamic
 * look at dashcache
 */


import axios from "axios";
const http = require('http');
const https = require('https');
const queryString = require('query-string');

//HARDCODED. CHANGE TO PROCESS FILE
// const hostname = "https://lyra.vgpro.gg";
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
  return new Error(e);
}

const handleRequest = ({data, status}) => {
  if (status === 200) return data;

  return errorRequest({status, message: "Failed silently..."});
}


const sendRequest = async (url, data, method = "get") => {

  const options = {
    url,
    method,
  }

  try {
    const req = await request(options);
    return handleRequest(req);
  }
  catch(e) {
    errorRequest(e);
  }
}

const sendRequest_Old = async (url, data, method = "get") => {

  const options = {
    baseURL: "https://lyra.vgpro.gg/",
    url,
    method,
  }

  try {
    const req = await request(options);
    return handleRequest(req);
  }
  catch(e) {
    errorRequest(e);
  }
}

const API = {};

API.getProFeed = () => {
  return sendRequest("/pro/history/");
}

API.getLead5 = () => {
  // return sendRequest("/leaderboard/?limit=5");
  return sendRequest_Old("/topfive/")
}

API.getTopHeroes = () => {
  return sendRequest("/topheroes");
}

/* ==== PLAYER LOOKUP ===== */
API.lookupPlayer = (playerName) => {
  return sendRequest(`/player/${playerName}/find`);
}

API.fetchPlayerStats = (playerName) => {
  return sendRequest(`/player/${playerName}/stats`);
}

API.fetchPlayerMatches = (playerName, filtersArgs) => {

  let f = {
    limit: 5,
    ...filtersArgs
  }

  const filters = queryString.stringify(f);

  return sendRequest(`/matches/${playerName}?${filters}`);
}

export default API;
