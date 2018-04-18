import React from "react";

import Stats from "./Stats";
import Builds from "./Builds";
import ChartsByHistory from "./Graphs";
import Counter from "./HeroLists";
import Skills from "./Skills";

import { SPACE_GRID } from "./../Details.style";
import styled from "styled-components";

export const Graphs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${SPACE_GRID};
  grid-row-gap: ${SPACE_GRID};

  grid-column: 2 / 4;
  grid-row: 1 / 1;

  @media screen and (max-width: 800px) {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

`;

export const Counters = styled.div`
  grid-column: 3 / 4;
  grid-row: 2 / 4;

  display: flex;
`;

const Overview = (props) => (
  <React.Fragment>
    <Stats {...props} />

    <Graphs>
      <ChartsByHistory {...props} />
    </Graphs>


    <Builds.Popular {...props} />
    <Builds.WinRate {...props} />

    <Counters>
      <Counter {...props} />
    </Counters>


    <Skills.Popular {...props} />
    <Skills.WinRate {...props} />

  </React.Fragment>
);

export default Overview;