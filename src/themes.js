const Light = {
  name: "light",
  logo: "logo_small.png",
  font: {
    body: "Roboto",
    highlight: "Roboto Condensed",
  },
  primary: {
    500: "#c29b3b",
    400: "#E6BE3D",
    300: "#F8CC6A",
    200: "#eed477",
    100: "#faf3d9",
  },
  text: {
    solid: "#000000",
    500: "#3A3A3A",
    400: "#4A4A4A",
    300: "#9B9B9B",
    200: "rgba(195, 195, 195, 1)",
    100: "#D8D8D8"
  },
  extra: {
    "win": "#5DB4F1",
    "loss": "#F1685D",
    "blueSide": "#4A90E2",
    "redSide": "#FF6262",
    "carry": "#a02e2d",
    "captain": "#bf9601",
    "jungler": "#6ab70b",
    "sub": "#313131",
    "commonMedal": "#494949",
    "goldMedal": "#E8A827",
    "silverMedal": "#9B9B9B",
    "bronzeMedal": "#A54916",
  },
  bgOpacity: 0.4,
  shadow: "rgba(0, 0, 0, 0.1)",
  background: {
    primary: "#ECEEF1",
    secondary: "#FAFAFA",
    third: "#c2c2c2",
    box: "#FFFFFF",
    boxHover: "rgb(247, 247, 247)",
    listOdd: "#f1f1f1",
    listHover: "#E7E7E7",
    slot: "#c9c9c9",
    slotBorder: "#808080",
    footer: "#383838",
  },
  gradient: {
    "primary": "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)",
    "red": "radial-gradient(50% 100%, #F5515F 44%, #9F041B 0%)",
    "green": "radial-gradient(0% 100%, #B4EC51 51%, #429321 47%)",
    "orange": "radial-gradient(0% 50%, #FAD961 45%, #F76B1C 41%)",
    "boxDividerBackground": "linear-gradient(to top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0) 100%)",
    "skeleton": "linear-gradient(90deg,rgba(102, 107, 109, 0.192),rgba(184, 193, 197, 0.4),rgba(186, 194, 197, 0.2))"
  }
};


const Night = {
  name: "night",
  logo: "logo_small_inverse.png",
  font: {
    body: "Roboto",
    highlight: "Roboto Condensed",
  },
  primary: {
    500: "#c29b3b",
    400: "#E6BE3D",
    300: "#F8CC6A",
    200: "#eed477",
    100: "#faf3d9",
  },
  text: {
    solid: "#FFFFFF",
    500: "#FAFAFA",
    400: "#E7E7E7",
    300: "#D8D8D8",
    200: "#c3c3c3",
    100: "#8C8C8C"
  },
  extra: {
    "win": "#4A90E2",
    "loss": "#FF6262",
    "blueSide": "#4A90E2",
    "redSide": "#FF6262",
    "carry": "#FF6262",
    "captain": "#F5CA29",
    "jungler": "#7ED321",
    "sub": "#313131",
    "commonMedal": "#494949",
    "goldMedal": "#E8A827",
    "silverMedal": "#9B9B9B",
    "bronzeMedal": "#A54916",
  },
  bgOpacity: 0.04,
  shadow: "rgba(0, 0, 0, 0.1)",
  background: {
    primary: "#141E26 ",
    secondary: "#1e2c3a",
    third: "#c2c2c2",
    box: "#1B2937",
    boxHover: "#1e2c3a",
    listOdd: "rgba(51, 62, 84, 0.54)",
    listHover: "rgb(51,62,84)",
    slot: "#273C50",
    slotBorder: "#808080",
    footer: "#1B2937",
  },
  gradient: {
    "primary": "linear-gradient(-90deg, #F3DD5C 0%, #E7AE2A 100%)",
    "red": "radial-gradient(50% 100%, #F5515F 44%, #9F041B 0%)",
    "green": "radial-gradient(0% 100%, #B4EC51 51%, #429321 47%)",
    "orange": "radial-gradient(0% 50%, #FAD961 45%, #F76B1C 41%)",
    "boxDividerBackground": "linear-gradient(to top, rgba(0,0,0,0.05) 0%,rgba(0,0,0,0) 100%)",
    "skeleton": "linear-gradient(90deg,rgba(102, 107, 109, 0.192),rgba(184, 193, 197, 0.4),rgba(186, 194, 197, 0.2))"
  }
};

export default [
  Light, 
  Night
];