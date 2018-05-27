import React from "react";
import { Link } from "react-router-dom";
import _forEach from "lodash/forEach";

import { Trans, translate } from "react-i18next";

import { fetchLeaderboard } from "./../../../actions/api";

import { SkeletonPayload } from "../../common/Skeleton";
import Utils from "./../../../utils";

import { REGIONS, LEADERBOARD_TYPES } from "./../../../config/constants";

import Box from "./../../common/Box";
import ErrorScreen from "./../../common/ErrorScreen";
import LeadMember from "./LeadMember";

import * as Styled from "./LeadBox.style";

class Lead5 extends React.Component {
  constructor() {
    super();

    this.state = {
      status: "loading",
      type: LEADERBOARD_TYPES[0],
      region: "all",
      payload: SkeletonPayload(4),
    };
  }

  changeRegion = region => e => {
    if (this.state.region === region) return;
    this.setState(
      {
        region: region,
      },
      this.fetch
    );
  };

  changeType = type => e => {
    if (this.state.type === type) return;
    this.setState(
      {
        type,
      },
      this.fetch
    );
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    let { type, region } = this.state;

    const server_region = region === "sea" ? "sg" : region;

    this.setState({
      status: "loading",
    });

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(type.value, server_region, { limit: 4 }),
      res => this.setState({ status: "loaded", payload: res }),
      e => this.setState({ status: "error", payload: e })
    );
  }

  componentWillUnmount() {
    this.cancel();
  }

  render() {
    const t = this.props.t;
    const { payload, status } = this.state;
    let content = [];

    if (status === "error" || !payload)
      content = <ErrorScreen err={payload} />;
    else {
      _forEach(payload, (each, index) => {
        content.push(
          <LeadMember
            key={`${index} - ${each.name}`}
            status={status}
            data={each}
            mode={this.state.type.value}
          />
        );
        index++;
      });
    }

    return (
      <Styled.Wrapper animation="fadeInUp">
        <Styled.Title className="Lead5-Title">
          <Trans i18nKey={`gamemode.${this.state.type.value}`} />{" "}
          {t("terms.Top", { term: 4 })}
          <Box.selector>
            {LEADERBOARD_TYPES.map(type => (
              <Box.selectorOptions
                key={type.value}
                icon={type.icon}
                active={type.value === this.state.type.value}
                onClick={this.changeType(type)}
              />
            ))}
          </Box.selector>
        </Styled.Title>
        <Box.body>
          <div className="Box_RegionSelect">
            {REGIONS.map(region => (
              <div
                key={region}
                className={region === this.state.region ? "active" : ""}
                onClick={this.changeRegion(region)}
              >
                {region === "all" ? <Trans i18nKey="terms.All" /> : region}
              </div>
            ))}
          </div>
          <div className="Box_Divider" />
          {content}
        </Box.body>
        <Box.action>
          <Link to={"/leaderboard"}>
            <Box.button>
              <Trans i18nKey="general.More" />
            </Box.button>
          </Link>
        </Box.action>
      </Styled.Wrapper>
    );
  }
}

export default translate()(Lead5);
