import React from "react";
// import Box from "../../common/Box";

import "./ProfileFilters.css";

import { connect }          from "react-redux";

class MenuSelector extends React.Component {

  state = {open: false}

  eventListener = null;

  changeMenu = (e) => {
    this.setState((prevState) => {
      return {open: !prevState.open};
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
    if (!this.menu.contains(e.target)) {
      this.changeMenu();
    }
  }


  render() {

    let optionsMenu = null;
    let {options, active, onChange} = this.props;

    const activeName = options.find(o => active === o.value);

    if (this.state.open) {
      optionsMenu = (
          <div className="Menu-Choices">
            {options.map(option => (
              <div className={
                `Menu-Choices-Choice ${option.value === active && "active"}`}
                onClick={onChange(option.value)}
                key={option.value}>{option.label}</div>
            ))}
          </div>
      )
    };

    return (
        <div className="Menu-Selected" ref={(ref) => this.menu = ref}>
          <span onClick={this.changeMenu}>{(activeName && activeName.label) || "Unknown"}</span>
          {optionsMenu}
        </div>
    )

  }
}

class ProfileFilters extends React.Component {


  changeGameMode = (gameMode) => () => {
    const {filters} = this.props;
    this.props.onChange({
      ...filters,
      gameMode: gameMode
    });
  }
  
  changeSeason = (season) => () => {
    const {filters} = this.props;
    this.props.onChange({
      ...filters,
      season: season
    });
  }

  render() {
    
    const {status, filters, playerStats} = this.props;

    let gameModeOptions = [];
    let seasonOptions   = [];
    let gameModeActive  = [];
    let seasonActive    = [];

    if (status === "loaded") {
      gameModeOptions = [
        { value: "", label: "All Modes" },
        ...playerStats.gameModesAvailable.map(gameMode => {
          return { value: gameMode, label: gameMode };
        })
      ]
        
      gameModeActive = filters.gameMode;
      seasonActive = filters.season;
      
      seasonOptions = [
        { value: "", label: "All Time" },
        ...playerStats.seasonsAvailable.map(season => {
          return { value: season, label: season };
        })
      ]
    }

    return (
      <div className="ProfileFilters">
        <div className="ProfileFilters-label">Stats for</div>
        <MenuSelector options={gameModeOptions} 
                      active={gameModeActive} 
                      onChange={this.changeGameMode}
        />
        <div className="ProfileFilters-label"> in </div>
        <MenuSelector options={seasonOptions} 
                      active={seasonActive}
                      onChange={this.changeSeason}
        />
      </div>
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
