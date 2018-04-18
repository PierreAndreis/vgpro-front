import React from "react";

import * as Styled from "./Builds.style";
import Box from "../../../common/Box";

const Popular = ({payload, heroName}) => {
  let items = [];
  if (payload) {
    items = payload.builds
    .sort((a, b) => (a.pickRate > b.pickRate) ? 1 : -1)[0].items;
  }

  let build = [];

  for (let i = 0; i < 4; i++) {
    build.push(
       <Styled.Item key={i} type="items" name={items[i]}/>
    )
  }

  return (
    <Box.wrap>
      <Box.title>Most Frequent Build</Box.title>
      <Box.body>
        <Styled.Builds>
          {build}
        </Styled.Builds>
      </Box.body>
    </Box.wrap>
  )
}

const WinRate = ({payload}) => {
  let items = [];
  if (payload) {
    items = payload.builds
    .sort((a, b) => (a.winRate > b.winRate) ? 1 : -1)[0].items;
  }

  let build = [];

  for (let i = 0; i < 4; i++) {
    build.push(
       <Styled.Item key={i} type="items" name={items[i]}/>
    )
  }

  return (
    <Box.wrap>
      <Box.title>Highest Win % Build</Box.title>
      <Box.body>
        <Styled.Builds>
          {build}
        </Styled.Builds>
      </Box.body>
    </Box.wrap>
  )
}

export default {
  Popular,
  WinRate
};