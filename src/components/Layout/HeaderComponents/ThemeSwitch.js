import React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {setTheme} from "./../../../actions/user";
import styled, {css} from "styled-components";

const Button = styled.button`
  border: 0;
  background: none;
  margin: 0 10px;
  padding: 5px;
  font-size: 18px;
  height: 30px;
  cursor: pointer;
  color: ${props => props.theme.text[300]};

  ${props => props.text && css`
    background: rgba(0, 0, 0, 0.8);
    padding: 5px;
    border-radius: 5px;
  `}
`;

class ThemeSwitcher extends React.Component {

  changeTheme = () => {
    const newTheme = this.props.currentTheme === "night" ? "light" : "night";
    this.props.setTheme(newTheme);
  }

  render() {

    let text = this.props.currentTheme === "night" ? "Switch to Light Mode" : "Switch to Night Mode";

    return (
      <div>
        <Button onClick={this.changeTheme} text={this.props.text}><i className="fa fa-adjust" /> {this.props.text && text} </Button>
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
