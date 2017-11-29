import React from "react";

import "./Skeleton.css";

const Skeleton = ({width, height, borderRadius}) => {

  const style = {
    width,
    height,
    borderRadius
  }

  return (
    <div className="loadingSkeleton" style={style}/>
  )
}

Skeleton.defaultProps = {
  width: 100,
  height: 20,
  borderRadius: 0
}

const SkeletonContainer = (Loading, Loaded) => {
  return class extends React.Component {
    render() {
      if (this.props.status === "loading") return <Loading {...this.props} />;
      else return <Loaded {...this.props}/>
    }
  }
}

const SkeletonPayload = (number) => {
  return Array(number).fill({});
}

export {
  Skeleton,
  SkeletonContainer,
  SkeletonPayload
}

