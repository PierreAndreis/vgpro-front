import React from "react";

class AssetLoader extends React.Component {

  render() {
    const {type, name, className} = this.props;

    let name_ = name;
    

    if (type === "tiers") name_ = parseInt(name_, 10) + 1;
    let cleanName = String(name_).replace(/([ ])+/g, "-").replace("'", "").toLowerCase();
    let cleanImage = `https://cdn.vgpro.gg/${type}/${cleanName}.png`;

    let style = {}

    if (name) {
      style = {
        backgroundImage: `url(${cleanImage})`
      }
    }

    return (
      <div className={className} style={style}>
        {this.props.children}
      </div>
    );
  }
}

export default AssetLoader;