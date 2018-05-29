import React from "react";
import { Trans } from "react-i18next";

import { SkeletonWrapper } from "./../../../common/Skeleton";
import { Rate } from "./../../../common/ColoredValues";

import * as Styled from "./Builds.style";
import Box from "../../../common/Box";

const sort = (property, backup) => (a, b) => {
  if (a[property] === b[property]) {
    return a[backup] > b[backup] ? 1 : -1;
  }
  return a[property] > b[property] ? -1 : 1;
};

const withModal = Component => {
  return class ModalHero extends React.Component {
    state = { open: false };

    onToggle = () =>
      this.setState(prevState => ({ open: !prevState.open }));

    render() {
      return (
        <React.Fragment>
          <Component {...this.props} openModal={this.onToggle} />
          <Styled.Modal visible={this.state.open}>
            <div
              style={{ position: "relative", zIndex: 9 }}
              onClick={this.onToggle}
            >
              <Styled.ModalBackground />
            </div>

            <div style={{ position: "relative", zIndex: 10 }}>
              <Box.wrap>
                <Box.title>
                  Situational Items
                  <Box.selector>
                    <i
                      className="fa fa-close"
                      onClick={this.onToggle}
                      style={{ cursor: "pointer" }}
                    />
                  </Box.selector>
                </Box.title>
                <Box.body style={{ padding: "10px" }}>
                  <div>
                    Defense and Boots items can be replaced by
                    "Situational" items.{" "}
                    <p>
                      <Styled.SubtitleItem
                        name="Situational Defense"
                        big
                      />{" "}
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
                      In order to find the best builds, we group builds
                      with the same core items and different situational
                      items like boots or defense. Once these groups are
                      made, we run algorithms to find if there is any build
                      on each group that is 80% more relevant than the
                      others.
                    </p>
                    <p>
                      {" "}
                      If there is not, we flag the defense/boots item as
                      "situational" and aggregate their stats in one.
                      Otherwise we keep them as their own.
                    </p>
                  </div>
                </Box.body>
              </Box.wrap>
            </div>
          </Styled.Modal>
        </React.Fragment>
      );
    }
  };
};

const Popular = withModal(({ payload, heroName, openModal }) => {
  let items = [];
  let buildInfo;

  if (payload) {
    buildInfo = payload.builds.sort(sort("pickRate", "winRate"))[0];
    items = buildInfo.items;
  }

  let build = [];

  for (let i = 0; i < 4; i++) {
    let isSituational = items[i] && items[i].includes("Situational");

    build.push(
      <Styled.Item
        key={i}
        type="items"
        name={items[i]}
        onClick={() => isSituational && openModal()}
        style={{ cursor: isSituational ? "pointer" : "initial" }}
      >
        {isSituational && <Styled.Interrogation>?</Styled.Interrogation>}
      </Styled.Item>
    );
  }

  return (
    <Box.wrap>
      <Box.title>Most Frequent Build</Box.title>
      <Box.body>
        <div style={{ display: "flex" }}>
          <Styled.Builds>{build}</Styled.Builds>
          <Styled.Description>
            <div>
              <div>
                <SkeletonWrapper width={30} height={16}>
                  {() => <Rate rate={buildInfo.pickRate} />}
                </SkeletonWrapper>
              </div>
              <span>
                <Trans i18nKey="terms.pickrate" />
              </span>
            </div>
            <div>
              <div>
                <SkeletonWrapper width={30} height={16}>
                  {() => <Rate rate={buildInfo.winRate} />}
                </SkeletonWrapper>
              </div>
              <span>
                <Trans i18nKey="terms.winrate" />
              </span>
            </div>
          </Styled.Description>
        </div>
      </Box.body>
    </Box.wrap>
  );
});

const WinRate = withModal(({ payload, openModal }) => {
  let items = [];
  let buildInfo;

  if (payload) {
    buildInfo = payload.builds.sort(sort("winRate", "pickRate"))[0];
    items = buildInfo.items;
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
        onClick={() => isSituational && openModal()}
      >
        {isSituational && <Styled.Interrogation>?</Styled.Interrogation>}
      </Styled.Item>
    );
  }

  return (
    <Box.wrap>
      <Box.title>Highest Win % Build</Box.title>
      <Box.body>
        <div style={{ display: "flex" }}>
          <Styled.Builds>{build}</Styled.Builds>
          <Styled.Description>
            <div>
              <div>
                <SkeletonWrapper width={30} height={16}>
                  {() => <Rate rate={buildInfo.pickRate} />}
                </SkeletonWrapper>
              </div>
              <span>
                <Trans i18nKey="terms.pickrate" />
              </span>
            </div>
            <div>
              <div>
                <SkeletonWrapper width={30} height={16}>
                  {() => <Rate rate={buildInfo.winRate} />}
                </SkeletonWrapper>
              </div>
              <span>
                <Trans i18nKey="terms.winrate" />
              </span>
            </div>
          </Styled.Description>
        </div>
      </Box.body>
    </Box.wrap>
  );
});

export default {
  Popular,
  WinRate,
};
