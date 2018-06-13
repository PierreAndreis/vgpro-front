import React, { Component } from "react";

export default class PolygonSVG extends Component {
  render() {
    return (
      <svg width="0" height="0">
        <defs>
          <clipPath id="heroPolygon" clipPathUnits="objectBoundingBox">
            <polygon
              points=".41,.02 .59,.02 
                      .91,.16 1,.33 
                      1,.66 .91,.83 
                      .59,.98 .41,.98 
                      .09,.83 0,.66
                      0,.33 .09,.16
                      "
            />

            <circle cx=".5" cy=".2" r=".2" />
            <circle cx=".5" cy=".8" r=".2" />
            <circle cx=".8" cy=".33" r=".2" />
            <circle cx=".8" cy=".66" r=".2" />
            <circle cx=".2" cy=".33" r=".2" />
            <circle cx=".2" cy=".66" r=".2" />
          </clipPath>
        </defs>
      </svg>
    );
  }
}
