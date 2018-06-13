import React from "react";

import { Trans } from "react-i18next";
import styled, { css } from "styled-components";
import AssetLoader from "../../common/AssetLoader";

const SubtitleItem = styled(AssetLoader).attrs({
  type: "items",
})`
  display: inline-block;
  background-size: 110%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  position: relative;

  width: 17px;
  height: 17px;
  border-radius: 50%;

  ${props =>
    props.big &&
    css`
      width: 20px;
      height: 20px;
      top: 3px;
    `};
`;

export default class SituationalItemModal extends React.Component {
  render() {
    return (
      <Trans i18nKey="situationalItem">
        <div>
          Defense and Boots items can be replaced by "Situational" items.{" "}
          <div>
            <SubtitleItem name="Situational Defense" big="true" /> means
            "Situational Defense Item". It can be either{" "}
            <SubtitleItem name="Aegis" />,{" "}
            <SubtitleItem name="Atlas Pauldron" />,{" "}
            <SubtitleItem name="Metal Jacket" /> or{" "}
            <SubtitleItem name="Slumbering Husk" />
          </div>
          <br />
          <div>
            <SubtitleItem name="Situational Boots" big="true" /> means
            "Situational Boots Item". It can be either{" "}
            <SubtitleItem name="Journey Boots" />,{" "}
            <SubtitleItem name="Halcyon Chargers" />, or{" "}
            <SubtitleItem name="Teleport Boots" />
          </div>
          <br />
          <div>
            In order to find the best builds, we group builds with the same
            core items and different situational items like boots or
            defense. Once these groups are made, we run algorithms to find
            if there is any build on each group that is 80% more relevant
            than the others.
          </div>
          <br />
          <div>
            {" "}
            If there is not, we flag the defense/boots item as
            "situational" and aggregate their stats in one. Otherwise we
            keep them as their own.
          </div>
        </div>
      </Trans>
    );
  }
}
