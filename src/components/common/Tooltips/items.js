import React from "react";
import ReactDOM from "react-dom";
import { Manager, Reference, Popper } from "react-popper";
import styled from "styled-components";
import Utils from "../../../utils";
import { opacify } from "polished";

const Tooltip = styled.div`
  background: ${props => props.theme.background.box};
  isolation: isolate;
  color: ${props => props.theme.text[400]};
  z-index: 90;

  border-radius: 10px;
  box-shadow: 0 5px 30px ${props => opacify(0.2, props.theme.shadow)};
`;

const Image = styled.div`
  background-size: 100%;
  width: 40px;
  height: 40px;
  background-image: url(${props => props.url});
  margin-right: 10px;
`;

const Description = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  h4 {
    font-size: 14px;
    margin: 0;

    &:before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      background: url("/icons/gold.svg") no-repeat bottom;
      background-size: 10px 10px;
      margin-right: 5px;
    }
  }
  h3 {
    font-size: 16px;
    color: ${props => props.theme.primary[400]};
    margin: 0;
  }
`;

export default class TooltipItem extends React.Component {
  render() {
    let itemDetails = {};
    let visible = this.props.visible;

    if (this.props.visible) {
      itemDetails = Utils.getItem(this.props.name);
      if (!itemDetails) {
        visible = false;
        itemDetails = {};
      }
    }

    return (
      <Manager>
        <Reference>{this.props.children}</Reference>
        {ReactDOM.createPortal(
          <Popper placement="top">
            {({ ref, style, placement }) => (
              <React.Fragment>
                {visible && (
                  <Tooltip
                    innerRef={ref}
                    style={style}
                    data-placement={placement}
                  >
                    <Description>
                      <Image url={this.props.image} />
                      <div>
                        <h3>{itemDetails.name}</h3>
                        <h4>{itemDetails.cost}</h4>
                      </div>
                    </Description>
                  </Tooltip>
                )}
              </React.Fragment>
            )}
          </Popper>,
          document.querySelector("#tooltip")
        )}
      </Manager>
    );
  }
}
