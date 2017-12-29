import React from "react";
import Utils from "../../utils";

class AssetLoader extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "url()"
    }
  }

  async getImage(type, name) {

    let cleanImage = "blank.png";
    if (name && type) {
      if (type === "tiers") name = parseInt(name, 10) + 2;
      let cleanName = String(name).replace(/([ ])+/g, "-").replace("'", "").toLowerCase();
      cleanImage = `${type}/${cleanName}.png`;
    };

    this.cancel = Utils.makeCancelable(
      import(`./../../assets/${cleanImage}`),
      (image) => this.setState({image}),
      () => this.getImage()
    );
  }

  componentWillMount() {

    const {type, name} = this.props;
    
    return this.getImage(type, name);
  }

  componentWillUnmount() {
    this.cancel();
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.props.name !== nextProps.name) {
      this.getImage(nextProps.type, nextProps.name);
    }

  }

  render() {

    const {image} = this.state;
    const {className} = this.props;

    return (
      <div className={className} style={{backgroundImage: `url(${image})`}}>
        {this.props.children}
      </div>
    );
  }
}

export default AssetLoader;