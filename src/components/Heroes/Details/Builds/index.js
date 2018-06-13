import React from "react";
import Spinner from "react-spinkit";
import { Trans } from "react-i18next";
import Box from "../../../common/Box";
import { SkeletonWrapper } from "../../../common/Skeleton";

import * as Styled from "./Builds.style";
import { Rate } from "../../../common/ColoredValues";
import Button from "./../../../common/Button";

import SituationalItemModal from "./../SituationalModal";

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
  state = {
    sort: "winRate",
    filter: "All",
  };

  changeSort = value => () => {
    this.setState({
      sort: value,
    });
  };

  changeFilter = value => () => {
    this.setState({
      filter: value,
    });
  };

  render() {
    let payload = this.props.payload;
    let { sort } = this.state;

    if (!payload) {
      return (
        <div style={{ margin: "10% auto", gridColumn: "2 / 2" }}>
          <Spinner
            name="line-spin-fade-loader"
            color="rgba(0, 0, 0, 0.5)"
            fadeIn="none"
          />
        </div>
      );
    }

    let builds;

    if (payload) {
      builds = payload.builds;
      builds.sort((a, b) => (a[sort] > b[sort] ? -1 : 1));
    }

    return (
      <React.Fragment>
        <Styled.Sidebar>
          <div style={{ marginBottom: 5 }}>
            <h3>
              <Trans i18nKey="general.sortBy" />
            </h3>
            {["winRate", "pickRate"].map(type => (
              <Button
                group
                key={type}
                onClick={this.changeSort(type)}
                active={this.state.sort === type}
              >
                <Trans i18nKey={`terms.${type.toLowerCase()}`} />
              </Button>
            ))}

            {/* <h3>Filter by</h3>
            {["All", "crystal", "weapon", "utility"].map(type => (
              <Button
                group
                key={type}
                onClick={this.changeFilter(type)}
                active={this.state.filter === type}
              >
                <Trans i18nKey={`terms.${type}`} />
              </Button>
            ))} */}
          </div>

          <Box.wrap>
            <Box.title>
<<<<<<< HEAD
              <Trans i18nKey="terms.situationalItemTitle" />
=======
              <Trans i18nKey="situationalItemTitle" />
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
            </Box.title>
            <Box.body style={{ padding: "10px" }}>
              <SituationalItemModal />
            </Box.body>
          </Box.wrap>
        </Styled.Sidebar>
        <Styled.Content>
          {builds.map(build => <Build info={build} key={build.key} />)}
        </Styled.Content>
      </React.Fragment>
    );
  }
}
