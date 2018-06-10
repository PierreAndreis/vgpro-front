import React from "react";
import { Trans } from "react-i18next";

import Media from "react-media";

import * as Styled from "./Heroes.style.js";

import CompareBox from "./CompareBox";
import { List } from "./List.js";

class Heroes extends React.Component {
  state = {
    selectedHero: null,
    searchingHero: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.mobile) return null;

    if (!prevState.selectedHero && nextProps.payload) {
      return { selectedHero: nextProps.payload.playingAgainst[0].key };
    }

    return null;
  }

  selectHero = hero => () => {
    this.setState({ selectedHero: hero });
  };

  onChange = e => {
    let value = e.target.value;
    this.setState({
      searchingHero: value,
    });
  };

  changeList = mode => e => {
    this.setState({
      list: mode,
    });
  };

  render() {
    let mobile = this.props.mobile;

    let list = this.state.list;

    if (!this.props.payload) {
      return <div>Loading</div>;
    }

    let sidebar = (
      <List
        payload={this.props.payload}
        onClick={this.selectHero}
        current={this.state.selectedHero}
      />
    );

    let content = (
      <React.Fragment>
        <CompareBox
          {...this.props}
          selectedHero={this.state.selectedHero}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        {!mobile && <Styled.Sidebar> {sidebar}</Styled.Sidebar>}

        {mobile &&
          this.state.selectedHero && (
            <div>
              <Styled.BackButton onClick={this.selectHero()}>
                <Trans i18nKey="general.Back" />
              </Styled.BackButton>
            </div>
          )}
        <Styled.Content>
          {(!mobile && content) ||
            (this.state.selectedHero ? content : sidebar)}
        </Styled.Content>
      </React.Fragment>
    );
  }
}
const queryToMobile = "(max-width: 800px)";

export default props => (
  <Media query={queryToMobile}>
    {matches => <Heroes {...props} mobile={matches} />}
  </Media>
);
