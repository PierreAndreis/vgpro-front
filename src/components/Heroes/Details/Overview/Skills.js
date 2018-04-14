import React from "react";

import * as Styled from "./Skills.style";
import Box from "../../../common/Box";

const Skills = ({ hero, skills }) => (
  <Styled.AbilitiesGrid>
    <Styled.AbilitiesRow>
      <span>A</span>
      <Styled.AbilitiesLabel type="abilities" name={`${hero}_a`} />
      {Array(12).fill({}).map((number, i) => (
        <Styled.AbilityLevel key={i} active={skills[i] === "a"}>{i + 1}</Styled.AbilityLevel>
      ))}
    </Styled.AbilitiesRow>
    <Styled.AbilitiesRow>
      <span>A</span>
      <Styled.AbilitiesLabel type="abilities" name={`${hero}_b`} />
      {Array(12).fill({}).map((number, i) => (
        <Styled.AbilityLevel key={i} active={skills[i] === "b"}>{i + 1}</Styled.AbilityLevel>
      ))}
    </Styled.AbilitiesRow>
    <Styled.AbilitiesRow>
      <span>A</span>
      <Styled.AbilitiesLabel type="abilities" name={`${hero}_c`} />
      {Array(12).fill({}).map((number, i) => (
        <Styled.AbilityLevel key={i} active={skills[i] === "c"}>{i + 1}</Styled.AbilityLevel>
      ))}
    </Styled.AbilitiesRow>
  </Styled.AbilitiesGrid>
)

const WinRate = ({ hero, payload }) => {

  let skills = [];

  if (payload) {
    payload.skills.sort((a, b) => a.winRate < b.winRate ? 1 : -1);
    skills = payload.skills[0].key.split(",");
  }

  return (
    <Box.wrap>
      <Box.title>Highest Win % Skill Order</Box.title>
      <Box.body>
        <Skills skills={skills} hero={hero} />
      </Box.body>
    </Box.wrap>
  );
};

const Popular = ({ hero, payload }) => {

  let skills = [];

  if (payload) {
    payload.skills.sort((a, b) => a.pickRate < b.pickRate ? 1 : -1);

  console.log(payload.skills[0]);
    skills = payload.skills[0].key.split(",");
  }


  return (
    <Box.wrap>
      <Box.title>Most Frequent Skill Order</Box.title>
      <Box.body>
        <Skills skills={skills} hero={hero} />
      </Box.body>
    </Box.wrap>
  );
};

export default {
  Popular,
  WinRate
}
