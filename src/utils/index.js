import SkillTiers from "./resources/skilltiers";


const Utils = {};

Utils.getSkillTier = (skillNumber) => {
  

  const skill = (typeof skillNumber !== "number") ? parseInt(skillNumber, 10) : skillNumber;

  const result = SkillTiers.filter(st => (skill === st.name));

  return (result[0] && result[0].friendlyName) ? result[0].friendlyName : "Unknown";

}

Utils.minifyNumber = (number, decPlaces = 2) => {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    let abbrev = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (let i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        let size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number === 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += ` ${abbrev[i]}`

             // We are done... stop
             break;
        }
    }

    return number;
}

Utils.paginateArray = (array, itemsPerPage, page) => {
  const endIndex   = page     * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  return array.filter((item, i) => {
    if ((i >= startIndex) && (i < endIndex)) return true;
    return false;
  })
}

Utils.transformRegion = (region) => {
  return ({
    "sg": "sea",
    "sea": "sg"
  }[region] || region).toUpperCase();
}

Utils.goToPlayer = (name) => {
  return `/players/${name}`;
}

export default Utils;