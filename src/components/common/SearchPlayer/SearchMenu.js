import React from "react";
import { Trans } from "react-i18next";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  addRecent,
  addFavorite,
  setRecent,
  setFavorite,
} from "./../../../actions/user";

import Utils from "./../../../utils";

import * as Style from "./SearchMenu.style.js";

const Player = ({ name, onRemove }) => (
  <NavLink to={Utils.goToPlayer(name)} activeClassName="active">
    {name} <span className="fa fa-close" onClick={onRemove} />
  </NavLink>
);

class SearchMenu extends React.Component {
  removeFavorite = name => e => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = this.props.favorites.filter(n => name !== n);
    this.props.setFavorite(favorites);
  };

  componentWillMount() {
    if (this.props.favorites.length > 8) {
      this.props.setFavorite(this.props.favorites.slice(0, 8));
    }

    if (this.props.recents.length > 8) {
      this.props.setRecent(this.props.recents.slice(0, 8));
    }
  }

  removeRecent = name => e => {
    e.preventDefault();
    e.stopPropagation();

    const recents = this.props.recents.filter(n => name !== n);
    this.props.setRecent(recents);
  };

  render() {
    const favorites = this.props.favorites;
    const recents = this.props.recents;

    let style = {};

    if (this.props.style) {
      style = this.props.style;
    }

    if (favorites.length < 1 && recents.length < 1) return null;

    return (
      <Style.SearchMenu style={style}>
        {favorites.length > 0 && (
          <Style.Category>
            <h1>
              <Trans i18nKey="terms.Favorites" />
            </h1>
            <Style.Content compact={this.props.compact}>
              {favorites.map(fav => (
                <Player
                  key={fav}
                  name={fav}
                  onRemove={this.removeFavorite(fav)}
                />
              ))}
            </Style.Content>
          </Style.Category>
        )}
        {recents.length > 0 && (
          <Style.Category>
            <h1>
              <Trans i18nKey="terms.RecentSearches" />
            </h1>
            <Style.Content compact={this.props.compact}>
              {recents.map(recent => (
                <Player
                  key={recent}
                  name={recent}
                  onRemove={this.removeRecent(recent)}
                />
              ))}
            </Style.Content>
          </Style.Category>
        )}
      </Style.SearchMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addRecent,
      addFavorite,
      setFavorite,
      setRecent,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMenu);
