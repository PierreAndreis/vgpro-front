import React from "react";
import { Trans, translate } from "react-i18next";
import Box from "./../../common/Box";
import ErrorScreen from "../../common/ErrorScreen";
import { KDA, Rate } from "../../common/ColoredValues";
import { SkeletonPayload, SkeletonWrapper } from "../../common/Skeleton";

import Utils from "./../../../utils";

import * as Styled from "./HeroesPlayed.style.js";

const HEROES_PER_PAGE = 4;

function compare(a, b) {
  if (a.games < b.games) return 1;
  if (a.games > b.games) return -1;
  if (a.wins < b.wins) return 1;
  if (a.wins > b.wins) return -1;
  return 0;
}

const Hero = ({ status, stats, t }) => {
  let kills;
  let deaths;
  let assists;
  let link = "/heroes";

  if (status === "loaded") {
    link = `/heroes/${stats.name}`;
    kills = stats.avgKills.toFixed(0);
    deaths = stats.avgDeaths.toFixed(0);
    assists = stats.avgAssists.toFixed(0);
  }

  return (
    <Styled.Each to={link}>
      <SkeletonWrapper
        status={status}
        width="40px"
        height="40px"
        borderRadius="50%"
      >
        {() => <Styled.HeroImage type="heroes" name={stats.name} />}
      </SkeletonWrapper>
      <Styled.Info>
        <Styled.Name>
          <SkeletonWrapper
            status={status}
            width="40px"
            height="15px"
            children={() => stats.name}
          />
        </Styled.Name>
        <Styled.SubName>
          <SkeletonWrapper status={status} width="30px" height="10px">
            {() => (
              <React.Fragment>
                {t("terms.games", { count: stats.games })}
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </Styled.SubName>
      </Styled.Info>

      <Styled.Stats>
        <Styled.KDA>
          <SkeletonWrapper status={status} width="50px" height="15px">
            {() => (
              <React.Fragment>
                <KDA kda={stats.kda} /> <Trans i18nKey="terms.KDA" />
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </Styled.KDA>

        <Styled.KDADetails>
          <SkeletonWrapper status={status} width="80px" height="15px">
            {() => (
              <React.Fragment>
                <span>{kills}</span>/<span id="deaths">{deaths}</span>/<span
                >
                  {assists}
                </span>
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </Styled.KDADetails>
      </Styled.Stats>

      <Styled.WR>
        <div>
          <SkeletonWrapper status={status} width="60px" height="20px">
            {() => <Rate rate={stats.winRate} />}
          </SkeletonWrapper>
        </div>
        <span>
          <SkeletonWrapper status={status} width="40px" height="10px">
            {() => (
              <React.Fragment>
                {stats.wins} W - {stats.loss} L
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </span>
      </Styled.WR>
    </Styled.Each>
  );
};

class HeroesPlayed extends React.PureComponent {
  state = {
    page: 1,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === "loading") return this.setState({ page: 1 });
  }

  paginateUp(e) {
    if (e.target.id === "disabled") return;

    this.setState({
      page: this.state.page + 1,
    });
  }

  paginateDown(e) {
    if (e.target.id === "disabled" || this.state.page < 2) return;
    this.setState({
      page: this.state.page - 1,
    });
  }

  render() {
    const { status, data, t } = this.props;
    const { page } = this.state;

    let payload;
    let content = [];
    let lastPage;

    if (status === "loaded" && (data && data.stats && data.stats.Heroes)) {
      let heroes = data.stats.Heroes;
      heroes = heroes.sort(compare);

      const itemPerPage = HEROES_PER_PAGE;
      lastPage = heroes ? heroes.length / itemPerPage : 1;

      payload = Utils.paginateArray(heroes, HEROES_PER_PAGE, page);
    } else if (status === "loading") {
      payload = SkeletonPayload(HEROES_PER_PAGE);
    } else {
      return <ErrorScreen />;
    }

    payload.forEach((hero, index) => {
      content.push(
        <Hero key={index} t={t} status={status} stats={hero} />
      );
    });

    return (
      <Styled.Wrap>
        <Box.title>{t("profile.Heroes")}</Box.title>
        <Styled.Content>{content}</Styled.Content>
        <Box.action>
          <Box.button
            disabled={status !== "loaded" || page <= 1}
            onClick={this.paginateDown.bind(this)}
          >
            {t("general.Back")}
          </Box.button>
          <Box.button
            disabled={status !== "loaded" || page >= lastPage}
            onClick={this.paginateUp.bind(this)}
          >
            {t("general.Next")}
          </Box.button>
        </Box.action>
      </Styled.Wrap>
    );
  }
}

export default translate()(HeroesPlayed);
