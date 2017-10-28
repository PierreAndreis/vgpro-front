import SkillTiers from "./resources/skilltiers";


const Utils = {};

Utils.getSkillTier = (skillNumber) => {
  

  const skill = (typeof skillNumber !== "number") ? parseInt(skillNumber, 10) : skillNumber;

  const result = SkillTiers.filter(st => (skill === st.name));

  return (result[0] && result[0].friendlyName) ? result[0].friendlyName : "Unknown";

}

Utils.transformRegion = (region) => {
  return ({
    "sg": "sea",
    "sea": "sg"
  }[region] || region).toUpperCase();
}

Utils.goToPlayer = (name) => {
  return `players/${name}`;
}

export default Utils;