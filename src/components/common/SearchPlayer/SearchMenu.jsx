import React                   from "react";
import { NavLink }             from "react-router-dom";
import { bindActionCreators }  from "redux";
import { connect }             from "react-redux";

import { addRecent, addFavorite, 
         setRecent, setFavorite } from "./../../../actions/user";

import Utils from "./../../../utils";
import Box from "../Box";

import "./SearchMenu.css";

const Player = ({name, onRemove}) => (
  <NavLink to={Utils.goToPlayer(name)} activeClassName="active" >
    {name} <span className="fa fa-close" onClick={onRemove}/>
  </NavLink>
)

class SearchMenu extends React.Component {
  
  removeFavorite = (name) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = this.props.favorites.filter(n => (name !== n));
    this.props.setFavorite(favorites);
  }

  removeRecent = (name) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    const recents = this.props.recents.filter(n => (name !== n));
    this.props.setRecent(recents);
  }

  render() {

    const favorites      = this.props.favorites;
    const recents        = this.props.recents;

    let style = {};

    if (this.props.style) {
      style = this.props.style;
    }

    if (favorites.length < 1 && recents.length < 1) return null;

    return (
      <Box.wrap className="SearchMenu animated fadeInDown" style={style}>
        {favorites.length > 0 &&
          (<div className="SearchMenu-Category">
              <h1>Favorites</h1>
              <div className="SearchMenu-Content">
                {favorites.map(fav => (
                  <Player key={fav} name={fav} onRemove={this.removeFavorite(fav)}/>
                ))}
              </div>
            </div>)
        }
        {recents.length > 0 &&
          (<div className="SearchMenu-Category">
              <h1>Recent Searches</h1>
              <div className="SearchMenu-Content">
                {recents.map(recent => (
                  <Player key={recent} name={recent} onRemove={this.removeRecent(recent)} />
                ))}
              </div>
            </div>)
        }
      </Box.wrap>
    )
  }
}

const mapStateToProps = state => {

  return {
    ...state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addRecent,
      addFavorite,
      setFavorite,
      setRecent
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchMenu);