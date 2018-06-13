import SkillTiers from "./resources/skilltiers";
import Items from "./resources/items.json";

const Utils = {};

Utils.getSkillTier = (skillNumber, complete = false) => {
  const skill =
    typeof skillNumber !== "number"
      ? parseInt(skillNumber, 10)
      : skillNumber;
  const result = SkillTiers[skill];
  if (complete) return result;
  return result && result.title ? result.title : "Unknown";
};

// Utils.getTier = rankpoints => {
//   let skillTier = -1;
//   rankpoints = Number(rankpoints);

//   // Lol at those with more than 3000
//   if (rankpoints > 3000) return 29;

//   for (let tier in SkillTiers[0]) {
//     let obj = SkillTiers[0][tier];
//     if (obj.starts <= rankpoints && obj.ends >= rankpoints) {
//       skillTier = tier;
//       break;
//     }
//   }

//   return skillTier;
// };

Utils.getTier = points => {
  points = Number(points);
  let tierInfo;

  for (let tier in SkillTiers) {
    let t = SkillTiers[tier];
    if (t.starts <= points && t.ends > points) {
      tierInfo = tier;

      break;
    }
  }

  if (!tierInfo) {
    if (points === -1) tierInfo = 0;
    if (points >= 3000) tierInfo = 30;
  }

  return tierInfo || 0;

  // return {
  //   ...tiers[tierInfo],
  //   tier: Math.ceil(tierInfo / 3), // Bronze, Silver, Gold
  // };
};

Utils.getPercentageTillNext = (skillNumber, vst) => {
  const skill =
    typeof skillNumber !== "number"
      ? parseInt(skillNumber, 10)
      : skillNumber;

  if (!skill) return 0;

  const result = SkillTiers[skill];
  const delta = result.ends - result.starts;
  const delta_two = vst - result.starts;

  const res = (delta_two / delta) * 100;

  return res > 100 ? 100 : res;
};

Utils.minifyNumber = (number, decPlaces = 2) => {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  let abbrev = ["k", "m", "b", "t"];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    let size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += ` ${abbrev[i]}`;

      // We are done... stop
      break;
    }
  }

  return number;
};

Utils.paginateArray = (array, itemsPerPage, page) => {
  const endIndex = page * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  return array.filter((item, i) => {
    if (i >= startIndex && i < endIndex) return true;
    return false;
  });
};

Utils.transformRegion = region => {
  if (!region) return "Unknown";

  return (
    {
      sg: "sea",
      sea: "sg",
    }[region] || region
  ).toUpperCase();
};

Utils.goToPlayer = name => {
  return `/players/${name}`;
};

Utils.makeCancelable = (promise, onfulfilled, onrejected) => {
  let hasCanceled = false;
  new Promise((resolve, reject) =>
    promise
      .then(
        val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val))
      )
      .catch(
        err => (hasCanceled ? reject({ isCanceled: true }) : reject(err))
      )
  )
    .then(onfulfilled)
    .catch(err => {
      if (err && !err.isCanceled) {
        throw err;
      }
    })
    .catch(onrejected);
  return function() {
    hasCanceled = true;
  };
};

Utils.getItem = itemName => {
  let cleanName = itemName.replace(/([-])+/g, "_");

  // We call it Super Scout, but it is called Super Scout 200
  if (cleanName === "superscout") cleanName = "superscout_2000";

  let itemDescription = Items[cleanName];

  if (!itemDescription) console.log("MISSING ITEM=", cleanName, itemName);

  return itemDescription;
};

export default Utils;
