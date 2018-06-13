import React from "react";
import TooltipItem from "./Tooltips/items";

class AssetLoader extends React.Component {
<<<<<<< HEAD
=======
  state = {
    tooltip: false,
  };

  toggleTooltip = () => {
    this.setState(prevState => {
      return {
        tooltip: !prevState.tooltip,
      };
    });
  };

>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
  render() {
    const {
      type,
      name,
      className,
      style: styleProps,
      ...othersProps
    } = this.props;

    let name_ = name;

<<<<<<< HEAD
    if (type === "tiers") name_ = parseInt(name_, 10) + 1;
=======
    if (type === "tiers") name_ = parseInt(name_, 10);
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
    let cleanName = String(name_)
      .replace(/([ ])+/g, "-")
      .replace("'", "")
      .toLowerCase();
    let cleanImage = `https://vgproassets.nyc3.cdn.digitaloceanspaces.com/${type}/${cleanName}.png`;

    let style = {};

    if (typeof name !== "undefined" || cleanName !== "undefined") {
      style = {
        backgroundImage: `url(${cleanImage})`,
      };
<<<<<<< HEAD
=======
    }

    if (styleProps) style = { ...style, ...styleProps };

    if (type === "items" && cleanName !== "undefined") {
      return (
        <TooltipItem
          visible={this.state.tooltip}
          image={cleanImage}
          name={cleanName}
        >
          {({ ref }) => (
            <div
              ref={ref}
              className={className}
              style={style}
              onMouseOver={this.toggleTooltip}
              onMouseOut={this.toggleTooltip}
              {...othersProps}
            >
              {this.props.children}
            </div>
          )}
        </TooltipItem>
      );
>>>>>>> 550a391b015ec7375bc89effb5a216452a3c2d75
    }

    if (styleProps) style = { ...style, ...styleProps };

    return (
      <div className={className} style={style} {...othersProps}>
        {this.props.children}
      </div>
    );
  }
}

export default AssetLoader;
