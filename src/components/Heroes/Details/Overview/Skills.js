import React from "react";

import { Trans } from "react-i18next";

import { SkeletonWrapper } from "./../../../common/Skeleton";
import { Rate } from "./../../../common/ColoredValues";

import * as Styled from "./Skills.style";
import Box from "../../../common/Box";

const Skills = ({ hero, skills }) => (
  <Styled.AbilitiesGrid>
    <Styled.AbilitiesRow>
      <span>A</span>
      <Styled.AbilitiesLabel type="abilities" name={`${hero}_a`} />
      {Array(12)
        .fill({})
        .map((number, i) => (
          <Styled.AbilityLevel key={i} active={skills[i] === "a"}>
            {i + 1}
          </Styled.AbilityLevel>
        ))}
    </Styled.AbilitiesRow>
    <Styled.AbilitiesRow>
      <span>A</span>
      <Styled.AbilitiesLabel type="abilities" name={`${hero}_b`} />
      {Array(12)
        .fill({})
        .map((number, i) => (
          <Styled.AbilityLevel key={i} active={skills[i] === "b"}>
            {i + 1}
          </Styled.AbilityLevel>
        ))}
    </Styled.AbilitiesRow>
    <Styled.AbilitiesRow>
      <span>A</span>
      <Styled.AbilitiesLabel type="abilities" name={`${hero}_c`} />
      {Array(12)
        .fill({})
        .map((number, i) => (
          <Styled.AbilityLevel key={i} active={skills[i] === "c"}>
            {i + 1}
          </Styled.AbilityLevel>
        ))}
    </Styled.AbilitiesRow>
  </Styled.AbilitiesGrid>
);

const WinRate = ({ hero, payload }) => {
  let skills = [];
  let skillsInfo;
  let overdrive = [];

  if (payload) {
    payload.skills.sort((a, b) => (a.winRate < b.winRate ? 1 : -1));
    skillsInfo = payload.skills[0];
    skills = skillsInfo.key.split(",");
    overdrive = skillsInfo.category.split("").slice(0, 2);
  }

  return (
    <Box.wrap>
      <Box.title>Highest Win % Skill Order</Box.title>
      <Box.body>
        <Skills skills={skills} hero={hero} />
        <Styled.Stats>
          <div>
            <b style={{ display: "flex" }}>
              {overdrive.map(name => (
                <Styled.AbilitiesLabel
                  type="abilities"
                  name={`${hero}_${name}`}
                  key={name}
                />
              ))}
            </b>
            <span>
              {" "}
              <Trans i18nKey="terms.Overdrive" />{" "}
            </span>
          </div>
          <div>
            <b>
              <SkeletonWrapper width={40}>
                {() => <Rate rate={skillsInfo.winRate} />}
              </SkeletonWrapper>
            </b>
            <span>
              <Trans i18nKey="terms.winrate" />
            </span>
          </div>
          <div>
            <b>
              <SkeletonWrapper width={40}>
                {() => <Rate rate={skillsInfo.pickRate} />}
              </SkeletonWrapper>
            </b>
            <span>
              <Trans i18nKey="terms.pickrate" />
            </span>
          </div>
        </Styled.Stats>
      </Box.body>
    </Box.wrap>
  );
};

const Popular = ({ hero, payload }) => {
  let skills = [];
  let skillsInfo;

  let overdrive = [];

  if (payload) {
    payload.skills.sort((a, b) => (a.pickRate < b.pickRate ? 1 : -1));
    skillsInfo = payload.skills[0];
    skills = skillsInfo.key.split(",");
    overdrive = skillsInfo.category.split("").slice(0, 2);
  }

  return (
    <Box.wrap>
      <Box.title>Most Frequent Skill Order</Box.title>
      <Box.body>
        <Skills skills={skills} hero={hero} />
        <Styled.Stats>
          <div>
            <b style={{ display: "flex" }}>
              {overdrive.map(name => (
                <Styled.AbilitiesLabel
                  type="abilities"
                  name={`${hero}_${name}`}
                  key={name}
                />
              ))}
            </b>
            <span>
              {" "}
              <Trans i18nKey="terms.Overdrive" />{" "}
            </span>
          </div>
          <div>
            <b>
              <SkeletonWrapper width={40}>
                {() => <Rate rate={skillsInfo.winRate} />}
              </SkeletonWrapper>
            </b>
            <span>
              <Trans i18nKey="terms.winrate" />
            </span>
          </div>
          <div>
            <b>
              <SkeletonWrapper width={40}>
                {() => <Rate rate={skillsInfo.pickRate} />}
              </SkeletonWrapper>
            </b>
            <span>
              <Trans i18nKey="terms.pickrate" />
            </span>
          </div>
        </Styled.Stats>
      </Box.body>
    </Box.wrap>
  );
};

export default {
  Popular,
  WinRate,
};
