import React from "react";

import * as Styled from "./Filters.styled.js";

import { connect } from "react-redux";

// Polyfill Node.Contains
function contains(node, other) {
  return node === other || !!(node.compareDocumentPosition(other) & 16);
}

class MenuSelector extends React.Component {

  state = { open: false }

  eventListener = null;

  changeMenu = (e) => {
    this.setState((prevState) => {
      return { open: !prevState.open };
    }, this.createListener);
  }

  createListener = () => {
    if (this.state.open === true) {
      document.addEventListener("click", this.checkClickOutside);
      return;
    }
    document.removeEventListener("click", this.checkClickOutside);
  }

  checkClickOutside = (e) => {
    if (!contains(this.menu, e.target)) {
      this.changeMenu();
    }
  }


  render() {

    let optionsMenu = null;
    let { options, active, onChange } = this.props;

    const activeName = options.find(o => active === o.value);

    if (this.state.open) {
      optionsMenu = (
        <Styled.Menu>
          {options.map(option => (
            <Styled.Option
              active={option.value === active}
              onClick={onChange(option.value)}
              key={option.value}>{option.label}</Styled.Option>
          ))}
        </Styled.Menu>
      )
    };

    return (
      <Styled.MenuLabel innerRef={(ref) => this.menu = ref}>
        <span onClick={this.changeMenu}>{(activeName && activeName.label) || "..."}</span>
        {optionsMenu}
      </Styled.MenuLabel>
    )

  }
}

class ProfileFilters extends React.Component {


  changeGameMode = (gameMode) => () => {
    const { filters } = this.props;
    this.props.onChange({
      ...filters,
      gameMode: gameMode
    });
  }

  changeSeason = (season) => () => {
    const { filters } = this.props;
    this.props.onChange({
      ...filters,
      season: season
    });
  }

  render() {

    const { status, filters, player } = this.props;

    let gameModeOptions = [];
    let seasonOptions = [];
    let gameModeActive = [];
    let seasonActive = [];

    if (status === "loaded") {
      gameModeOptions = [
        { value: "", label: "All Modes" },
        ...player.gameModesAvailable.map(gameMode => {
          return { value: gameMode, label: gameMode };
        })
      ]

      gameModeActive = filters.gameMode;
      seasonActive = filters.season;

      seasonOptions = [
        { value: "", label: "Lifetime" },
        ...player.seasonsAvailable.map(season => {
          return { value: season, label: season };
        })
      ]
    }

    return (
      <Styled.Wrapper>
        <Styled.Label>Stats for</Styled.Label>
        <MenuSelector options={gameModeOptions}
          active={gameModeActive}
          onChange={this.changeGameMode}
        />
        <Styled.Label> in </Styled.Label>
        <MenuSelector options={seasonOptions}
          active={seasonActive}
          onChange={this.changeSeason}
        />
      </Styled.Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.playerStats
  }
}

export default connect(
  mapStateToProps
)(ProfileFilters);
