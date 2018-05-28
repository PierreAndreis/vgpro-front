import React from "react";
import { Trans } from "react-i18next";
import Box from "../../../common/Box";
import { SkeletonWrapper } from "../../../common/Skeleton";

import * as Styled from "./Builds.style";
import { Rate } from "../../../common/ColoredValues";
import Button from "./../../../common/Button";

const Build = ({ info }) => {
  let items = [];

  if (info) {
    items = info.items;
  }

  let build = [];

  for (let i = 0; i < 4; i++) {
    let isSituational = items[i] && items[i].includes("Situational");

    build.push(
      <Styled.Item
        key={i}
        type="items"
        name={items[i]}
        style={{ cursor: isSituational ? "pointer" : "initial" }}
      />
    );
  }

  return (
    <Styled.BuildBox>
      <Box.body>
        <div style={{ margin: "0 auto" }}>
          <Styled.Builds>{build}</Styled.Builds>
        </div>
        <Styled.Description>
          <div>
            <div>
              <SkeletonWrapper width={30} height={16}>
                {() => <Rate rate={info.pickRate} />}
              </SkeletonWrapper>
            </div>
            <span>
              <Trans i18nKey="terms.pickrate" />
            </span>
          </div>
          <div>
            <div>
              <SkeletonWrapper width={30} height={16}>
                {() => <Rate rate={info.winRate} />}
              </SkeletonWrapper>
            </div>
            <span>
              <Trans i18nKey="terms.winrate" />
            </span>
          </div>
        </Styled.Description>
      </Box.body>
    </Styled.BuildBox>
  );
};

export default class Builds extends React.Component {
  render() {
    let payload = this.props.payload;

    if (!payload) return <div>Loading</div>;

    return (
      <React.Fragment>
        <Styled.Sidebar>
          <div style={{ marginBottom: 5 }}>
            <h3>Sort by</h3>
            <Button>Win Rate</Button>
            <Button>Pick Rate</Button>

            <h3>Filter by</h3>
            <Button>Crystal</Button>
            <Button>Weapon</Button>

            <Button>Utility</Button>
          </div>

          <Box.wrap>
            <Box.title>Situational Items</Box.title>
            <Box.body style={{ padding: "10px" }}>
              <div>
                Defense and Boots items can be replaced by "Situational"
                items.{" "}
                <p>
                  <Styled.SubtitleItem name="Situational Defense" big />{" "}
                  means "Situational Defense Item". It can be either{" "}
                  <Styled.SubtitleItem name="Aegis" />,{" "}
                  <Styled.SubtitleItem name="Atlas Pauldron" />,{" "}
                  <Styled.SubtitleItem name="Metal Jacket" /> or{" "}
                  <Styled.SubtitleItem name="Slumbering Husk" />
                </p>
                <p>
                  <Styled.SubtitleItem name="Situational Boots" big />{" "}
                  means "Situational Boots Item". It can be either{" "}
                  <Styled.SubtitleItem name="Journey Boots" />,{" "}
                  <Styled.SubtitleItem name="Halcyon Chargers" />, or{" "}
                  <Styled.SubtitleItem name="Teleport Boots" />
                </p>
                <p>
                  In order to find the best builds, we group builds with
                  the same core items and different situational items like
                  boots or defense. Once these groups are made, we run
                  algorithms to find if there is any build on each group
                  that is 80% more relevant than the others.
                </p>
                <p>
                  {" "}
                  If there is not, we flag the defense/boots item as
                  "situational" and aggregate their stats in one. Otherwise
                  we keep them as their own.
                </p>
              </div>
            </Box.body>
          </Box.wrap>
        </Styled.Sidebar>
        <Styled.Content>
          {payload.builds.map(build => (
            <Build info={build} key={build.key} />
          ))}
        </Styled.Content>
      </React.Fragment>
    );
  }
}
