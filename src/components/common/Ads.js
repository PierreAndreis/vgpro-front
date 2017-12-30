import React from "react";
import {withRouter} from "react-router-dom";
import AD from "react-google-publisher-tag";
import AdSense from 'react-adsense';


class Ads_2 extends React.Component {

  state = {
    active: true
  }

  componentWillReceiveProps() {
    this.setState({
      active: false
    }, () => {
      this.setState({
        active: true
      })
    });
  }

  render() {
    return (
      <div style={{margin: "5px auto", display: "inline", textAlign: "center"}}>
        {this.state.active && <AdSense.Google client='ca-pub-8733440501534468' slot='4915906039' />}
      </div>
    )
  }
}

export const Adsense = withRouter(Ads_2);

class Ads extends React.Component {

  state = {
    active: true
  }

  componentWillReceiveProps() {
    this.setState({
      active: false
    }, () => {
      this.setState({
        active: true
      })
    });
  }

  render() {
    return (
      <div style={{margin: "5px auto", display: "inline", textAlign: "center"}}>
        {this.state.active && <AD path="/21676119576/vgpro-react" />}
      </div>
    )
  }
}

export default withRouter(Ads);