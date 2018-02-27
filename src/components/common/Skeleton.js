import React from "react";
import styled, { keyframes } from "styled-components";

const cardLoading = keyframes`
  0%, to {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%
  }
`

const StyletonCSS = styled.div`
  display: inline-block;
  border-radius: 2px;
  background: ${props => props.theme.gradient.skeletonStyletonCss};
  animation: ${cardLoading} 2s ease infinite;
  background-size: 600% 600%;
  margin-bottom: 1px;

${'' /* .skeletonDiv:nth-child(odd) .loadingSkeleton {
  animation-delay: 0.4s;
} */}

`

const Skeleton = ({width, height, borderRadius}) => {

  const style = {
    width,
    height,
    borderRadius
  }

  return (
    <StyletonCSS style={style}/>
  )
}

Skeleton.defaultProps = {
  width: 100,
  height: 20,
  borderRadius: "5px"
}


const SkeletonContainer = (Loading, Loaded) => {
  return class extends React.PureComponent {
    render() {
      if (this.props.status === "loading") return <Loading {...this.props} />;
      else return <Loaded {...this.props}/>
    }
  }
}

class SkeletonWrapper extends React.PureComponent {
  render() {
    const {children, status, render, ...props} = this.props;

    if (typeof render === "function") {
      return (render(status, Skeleton));
    }

    if (status === "loading") return <Skeleton {...props} />
    else return (children());
  }
}

const SkeletonPayload = (number) => {
  return Array(number).fill({});
}

export {
  Skeleton,
  SkeletonWrapper,
  SkeletonContainer,
  SkeletonPayload
}

