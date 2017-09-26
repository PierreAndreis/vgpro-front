/**
 * todo:
 * better way to make request
 * more dynamic
 * look at dashcache
 */


import axios from "axios";
const http = require('http');
const https = require('https');
//HARDCODED. CHANGE TO PROCESS FILE
const hostname = "https://lyra.vgpro.gg";

const request = axios.create();


request.defaults.baseURL      = hostname;
request.defaults.timeout      = 1000;
request.defaults.responseType = "json";
request.defaults.httpAgent    =  new http.Agent({ keepAlive: true });
request.defaults.httpsAgent   = new https.Agent({ keepAlive: true });


const errorRequest = (e) => {
  console.warn(e);
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



export const getServers = () => {
  return sendRequest("/servers");
}
