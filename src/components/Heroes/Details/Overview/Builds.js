import React from "react";
import { Trans } from "react-i18next";

import { SkeletonWrapper } from "./../../../common/Skeleton";
import { Rate } from "./../../../common/ColoredValues";

import * as Styled from "./Builds.style";
import Box from "../../../common/Box";
import SituationalItemModal from "./../SituationalModal";

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
                  <Trans i18nKey="situationalItemTitle" />
                  <Box.selector>
                    <i
                      className="fa fa-close"
                      onClick={this.onToggle}
                      style={{ cursor: "pointer" }}
                    />
                  </Box.selector>
                </Box.title>
                <Box.body style={{ padding: "10px" }}>
                  <SituationalItemModal />
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
      <Box.title>
        <Trans i18nKey="heroes.mostFrequentBuild" />
      </Box.title>
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
      <Box.title>
        <Trans i18nKey="heroes.highestWinBuild" />
      </Box.title>
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
