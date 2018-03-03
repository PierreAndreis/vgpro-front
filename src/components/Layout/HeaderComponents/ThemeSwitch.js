import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {setTheme} from "./../../../actions/user";

class ThemeSwitcher extends React.Component {

  changeTheme = () => {
    const newTheme = this.props.currentTheme === "night" ? "light" : "night";
    console.log(newTheme);
    this.props.setTheme(newTheme);
  }

  render() {
    return (
      <div>
        <button onClick={this.changeTheme}>x</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTheme: state.user.currentTheme
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setTheme
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeSwitcher);
