import createHistory from "history/createBrowserHistory"
import { Redirect } from 'react-router';

import SkillTiers from "./resources/skilltiers";


const Utils = {};

Utils.getSkillTier = (skillNumber) => {
  
  const skill = (typeof skillNumber !== "Number") ? parseInt(skillNumber) : skillNumber;
  console.log(skill);
  const result = SkillTiers.filter(st => (skill === st.name));
  console.log(result);
  return (result[0] && result[0].friendlyName) ? result[0].friendlyName : "Unknown";

}

Utils.transformRegion = (region) => {
  return ({
    "sg": "sea",
    "sea": "sg"
  }[region] || region).toUpperCase();
}

Utils.goToPlayer = (region, name) => {
  return `players/${region}/${name}`;
}

export default Utils;