import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 1vw 1vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 1.5vw;
    color: ${props => props.theme.text[100]};
  }
`;

const BadImage = styled.div`
  width: 15vw;
  height: 15vw;
  background: url("/images/error.png") no-repeat center center;
  background-size: contain;
  margin: 0 auto;
  opacity: 0.6;
`;

const Message = styled.div`
  font-size: 2.5vw;
  margin-top: auto;
  text-align: center;
  margin: 1vw 0;
`;

export default class ErrorScreen extends React.Component {
  render() {
    return (
      <Wrap>
        <BadImage />
        <Message>{this.props.message}</Message>

        <span>
          If you think this is a mistake, please contact VGPRO.gg on
          twitter at @vgprogg
        </span>
      </Wrap>
    );
  }
}
