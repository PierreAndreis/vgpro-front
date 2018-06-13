import React from "react";

import Utils from "utils";
import { SkeletonWrapper } from "../../common/Skeleton";

import * as Styled from "./FeedMatch.style";

const FeedMatch = ({ status, t, data }) => {
  let link = "/";

  // In 5v5, HealingFlask and Vision Totems are default items. We don't need them.
  const itemsImage = [];
  let itemsWithout5v5Default = [];

  if (status === "loaded") {
    link = Utils.goToPlayer(data.proInfo.name);
    itemsWithout5v5Default = data.items.filter(
      itemName =>
        itemName !== "Vision Totem" && itemName !== "Healing Flask"
    );
  }

  for (let i = 0; i < 6; i++) {
    let name;
    if (itemsWithout5v5Default[i]) {
      name = itemsWithout5v5Default[i];
    }

    itemsImage.push(<Styled.Item key={i} type="items" name={name} />);
  }

  return (
    <Styled.Wrapper to={link}>
      <Styled.Status winner={data.winner} />

      <Styled.PlayerInfo>
        {/* <SkeletonWrapper status={status} width={30} height={30}>
          {() => <Styled.PlayerPicture playerName={data.proInfo.name} />}
        </SkeletonWrapper> */}

        <Styled.PlayerDetails>
          <SkeletonWrapper status={status} width={50} height={10}>
            {() => (
              <div>
                {data.proInfo.name} <span>{data.region}</span>
              </div>
            )}
          </SkeletonWrapper>

          <span>
            <SkeletonWrapper
              width={40}
              height={5}
              status={status}
              children={() => data.proInfo.team}
            />
          </span>
        </Styled.PlayerDetails>
      </Styled.PlayerInfo>

      <Styled.Game>
        <SkeletonWrapper
          status={status}
          width={25}
          height={25}
          borderRadius={"50%"}
        >
          {() => (
            <Styled.GameHero type="heroes" name={data.actor}>
              <Styled.GameRole role={data.role} />
            </Styled.GameHero>
          )}
        </SkeletonWrapper>

        <Styled.GameKDA>
          <SkeletonWrapper status={status} width={25} height={10}>
            {() => (
              <React.Fragment>
                {data.kills}/{data.deaths}/{data.assists}
              </React.Fragment>
            )}
          </SkeletonWrapper>
        </Styled.GameKDA>
      </Styled.Game>
      <Styled.Items>{itemsImage}</Styled.Items>
      <Styled.Arrow>
        <i className="fa fa-angle-right" />
      </Styled.Arrow>
    </Styled.Wrapper>
  );
};

export default FeedMatch;
