import React from "react";
import Helmet from "react-helmet";
import _forEach from "lodash/forEach";

import { Adsense } from "./../common/Ads";

import { Trans, translate } from "react-i18next";

import { BoxButton } from "./../common/Box";

import { fetchLeaderboard } from "./../../actions/api";
import { SkeletonPayload } from "./../common/Skeleton";
import ErrorScreen from "./../common/ErrorScreen";

import LeadMember from "./LeadMember";

import { LEADERBOARD_TYPES, REGIONS } from "./../../config/constants";

import Utils from "./../../utils";

import * as Styled from "./Leaderboard.style";

import Button from "./../common/Button";

const PER_PAGE = 10;

const AD_EVERY = 9;

// Small helper to modify a certain page easily without changing statw
const modifyPage = (page, newState) => prevState => {
  const newPage = [...prevState.pages];
  newPage[page] = newState;

  return {
    pages: newPage,
  };
};

class Leaderboard extends React.Component {
  initialPage = () => ({
    status: "loading",
    payload: SkeletonPayload(PER_PAGE),
  });

  initialState = () => {
    return {
      mode: LEADERBOARD_TYPES[0],
      region: "all",
      pages: [this.initialPage()],
      player: "",
      isPlayer: false,
    };
  };

  state = this.initialState();

  changeRegion = region => e => {
    if (this.state.region === region) return;
    // We have to reset all the pages
    this.setState(
      {
        region,
        pages: [this.initialPage()],
      },
      () => this.fetch(0)
    );
  };

  changeMode = mode => e => {
    if (this.state.mode === mode) return;
    // We have to reset all the pages
    this.setState(
      {
        mode,
        pages: [this.initialPage()],
      },
      () => this.fetch(0)
    );
  };

  changePlayer = e => {
    let value = e.target.value;
    this.setState({
      player: value,
    });
  };

  resetPlayer = () => {
    this.setState(
      {
        isPlayer: false,
        player: "",
        page: [this.initialPage()],
      },
      this.fetch.bind(this, [0])
    );
  };

  searchPlayer = e => {
    e.preventDefault();
    this.setState(
      {
        pages: [this.initialPage()],
        isPlayer: this.state.player,
      },
      this.fetch.bind(this, [0])
    );
  };

  componentDidMount() {
    this.fetch(0);
  }

  componentWillUnmount() {
    this.cancel();
  }

  async fetch(page) {
    let { mode, region } = this.state;
    const server_region = region === "sea" ? "sg" : region;
    const offset = page * PER_PAGE;
    const limit = PER_PAGE;

    const player = this.state.isPlayer && this.state.player;

    // Create a loading page
    this.setState(modifyPage(page, this.initialPage()));

    this.cancel = Utils.makeCancelable(
      fetchLeaderboard(mode.value, server_region, {
        player,
        limit,
        offset,
      }),
      res =>
        this.setState(modifyPage(page, { status: "ready", payload: res })),
      e => this.setState(modifyPage(page, { status: "error", payload: e }))
    );
  }

  nextPage = e => {
    if (e.target.id === "disabled") return;
    const { pages } = this.state;
    const nextPage = pages.length;
    this.fetch(nextPage);
  };

  prevPage = e => {
    if (e.target.id === "disabled") return;
    this.setState(prevState => {
      prevState.pages.pop();
      return prevState;
    });
  };

  render() {
    const t = this.props.t;
    const { isPlayer, pages } = this.state;
    let content = [];

    let anyError = pages.find(s => s.status === "error");
    let anyLoading = pages.find(s => s.status === "loading");
    let anyEmpty = pages.find(s => s.payload.length < 1);
    let onePage = pages.length === 1;

    let nextDisabled = isPlayer || anyError || anyLoading || anyEmpty;
    let prevDisabled = isPlayer || anyError || anyLoading || onePage;

    if (anyError) content = <ErrorScreen err={anyError.payload} boxed />;
    else if (isPlayer && pages[0].payload.length < 1)
      content = (
        <ErrorScreen
          message={`${isPlayer} was not found on this search criteria`}
          boxed
        />
      );
    else {
      let key = 0;
      let adCount = 0;
      _forEach(pages, (page, pageIndex, lol) => {
        page.payload.forEach((each, animationDelay) => {
          content.push(
            <LeadMember
              key={`${key++} - ${this.state.mode.label} - ${
                this.state.region
              }`}
              animationDelay={animationDelay}
              me={this.state.isPlayer}
              status={page.status}
              data={each}
              mode={this.state.mode.value}
            />
          );
          if (++adCount % AD_EVERY === 0) {
            content.push(
              <div
                key={`Adsense-Key-${adCount}`}
                style={{ width: "100%", height: "120px", flex: 1 }}
              >
                <Adsense />
              </div>
            );
          }
        });
      });
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{t("feature.Leaderboard")}</title>
        </Helmet>
        <Styled.Wrapper>
          <Styled.Filter>
            <Styled.FilterCategory>
              <h2>
                <Trans i18nKey="terms.Region" />
              </h2>
              {REGIONS.map(region => (
                <Button
                  key={region}
                  onClick={this.changeRegion(region)}
                  active={this.state.region === region}
                  group
                >
                  {region === "all" ? t("terms.All") : region}
                </Button>
              ))}
            </Styled.FilterCategory>

            <Styled.FilterCategory>
              <h2>
                <Trans i18nKey="terms.GameMode" />
              </h2>
              {LEADERBOARD_TYPES.map(type => (
                <Button
                  key={type.value}
                  onClick={this.changeMode(type)}
                  active={this.state.mode.value === type.value}
                  small
                >
                  <Trans
                    i18nKey={`gamemode.${type.value.toLowerCase()}`}
                  />
                </Button>
              ))}
            </Styled.FilterCategory>

            <Styled.InputCategory>
              <h2>
                <Trans i18nKey="terms.Search" />
              </h2>
              <form
                onSubmit={this.searchPlayer}
                style={{ position: "relative" }}
              >
                <Styled.Icon left onClick={this.searchPlayer}>
                  <i className="fa fa-search" />
                </Styled.Icon>
                {isPlayer && (
                  <Styled.Icon right onClick={this.resetPlayer}>
                    <i
                      className="fa fa-close"
                      style={{ color: "rgba(250, 0, 0, 0.7)" }}
                    />
                  </Styled.Icon>
                )}
                <Styled.Input
                  onChange={this.changePlayer}
                  value={this.state.player}
                />
              </form>
            </Styled.InputCategory>
          </Styled.Filter>
          <Adsense />
          <Styled.Content>{content}</Styled.Content>
          <Styled.Buttons>
            {!isPlayer ? (
              <React.Fragment>
                <BoxButton onClick={this.prevPage} disabled={prevDisabled}>
                  <Trans i18nKey="general.ViewLess" />
                </BoxButton>
                <BoxButton onClick={this.nextPage} disabled={nextDisabled}>
                  <Trans i18nKey="general.ViewMore" />
                </BoxButton>
              </React.Fragment>
            ) : (
              <BoxButton onClick={this.resetPlayer}>
                {" "}
                <Trans i18nKey="general.Reset" />
              </BoxButton>
            )}
          </Styled.Buttons>
        </Styled.Wrapper>
      </React.Fragment>
    );
  }
}

export default translate()(Leaderboard);
