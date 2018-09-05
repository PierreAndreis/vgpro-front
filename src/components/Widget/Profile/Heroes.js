import React, { Component } from "react";

import { translate, Trans } from "react-i18next";

import Spinner from "react-spinkit";
import Swiper from "react-id-swiper";

import { Box } from "../../common/Box";
import AssetLoader from "../../common/AssetLoader";
import styled from "styled-components";
import { SkeletonContext } from "../../common/Skeleton";
import { Rate, KDA } from "../../common/ColoredValues";

const Container = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  .container {
    margin: 0;
    height: 100%;
  }
  .swiper-pagination {
    bottom: 0;
    .swiper-pagination-bullet {
      width: 0.6vw;
      height: 0.6vw;
      background: none;
      opacity: 1;
      border: 0.2vw solid white;
      transition: all 100ms;
    }
    .swiper-pagination-bullet-active {
      background-color: white;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    filter: grayscale(100%) brightness(4);
    width: 2.5vw;
    height: 3vw;
    margin-top: -1.5vw;
    background-size: 100%;
  }

  .swiper-button-next {
    right: 0;
  }
  .swiper-button-prev {
    left: 0;
  }
`;

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 2.5vw;
`;

const Image = styled(AssetLoader)`
  width: 5vw;
  height: 5vw;
  border-radius: 100%;
  background-size: 120%;
  background-position: center center;
  background-repeat: no-repeat;
  flex-shrink: 0;
`;

const Info = styled.div`
  margin-left: 2vw;
  flex: 1;
  position: relative;
  h4 {
    font-size: 1.5vw;
    color: ${props => props.theme.primary[300]};
    position: absolute;
    margin: 0;
    top: -1.5vw;
  }
  div {
    white-space: nowrap;
    i {
      font-size: 1.5vw;
      margin-right: 0.5vw;
    }
    margin-bottom: -0.3vw;
    font-size: 1.5vw;
  }
  b {
    font-size: 1.3vw;
    font-weight: normal;
    color: ${props => props.theme.text[300]};
  }
`;

const Stats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 0.5vw;
  flex-wrap: no-wrap;
  i {
    font-size: 1vw;
    padding-left: 0.1vw;
    color: ${props => props.theme.text[400]};
  }
  & > div {
    font-weight: bold;
    white-space: nowrap;
    font-size: 1.4vw;
  }
  & b {
    color: red;
  }
  & > span {
    white-space: nowrap;
    font-size: 1.1vw;
    color: ${props => props.theme.text[300]};
  }
`;

const Games = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.2vw;
  border-radius: 1vw;
  padding: 0.2vw 1vw;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  font-weight: 700;
`;

const Hero = translate("widget")(({ t, payload }) => {
  const wR = ((payload.wins / payload.games) * 100).toFixed(1);
  return (
    <Wrap>
      <Image type="heroes" name={payload.name} />
      <Info>
        <h4>{payload.name}</h4>
        <div>
          <i className="fa fa-trophy" />
          <Rate rate={wR} />
        </div>
        <b>
          {payload.wins} W - {payload.games - payload.wins} L{" "}
        </b>
      </Info>
      <Stats>
        <div>
          <Trans i18nKey={"widget.kda"}>
            <KDA kda={payload.kda} /> KDA
          </Trans>
        </div>
        <span>
          <i className="vg-kills" /> {payload.avgKills.toFixed(0)}{" "}
          <b>
            <i className="vg-deaths" /> {payload.avgDeaths.toFixed(0)}
          </b>{" "}
          <i className="vg-assists" /> {payload.avgAssists.toFixed(0)}
        </span>
      </Stats>
      <Games>{t("widget.games", { games: payload.games })}</Games>
    </Wrap>
  );
});

export default class WidgetInfo extends Component {
  render() {
    const params = {
      // slidesPerView: 1,
      // autoplay: {
      //   delay: 5000,
      //   disableOnInteraction: false,
      // },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      containerClass: "swiper-container container",
    };

    const payload = this.props.payload;
    let heroes = [];

    if (payload.stats) {
      payload.stats.Heroes.sort((a, b) => (a.games > b.games ? -1 : 1));
      heroes = payload.stats.Heroes.slice(0, 5).map(hero => {
        return (
          <div key={hero.name}>
            <Hero payload={hero} />
          </div>
        );
      });
    }

    return (
      <div>
        <h2>
          <Trans i18nKey="widget.heroes" />
        </h2>
        <Container>
          <SkeletonContext.Consumer>
            {status =>
              status === "loading" ? (
                <div
                  style={{
                    margin: "5vw auto",
                  }}
                >
                  <Spinner
                    name="line-spin-fade-loader"
                    color="rgba(255, 255, 255, 0.5)"
                    fadeIn="none"
                  />
                </div>
              ) : (
                <Swiper {...params}>{heroes}</Swiper>
              )
            }
          </SkeletonContext.Consumer>
        </Container>
      </div>
    );
  }
}
