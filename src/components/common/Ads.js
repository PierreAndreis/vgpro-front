import React from "react";
import {withRouter} from "react-router-dom";
import AdSense from 'react-adsense';


class Ads_2 extends React.Component {

  state = {
    active: true
  }

  componentDidCatch(e) {
    this.setState({
      active: false
    })
  } 

  componentWillReceiveProps(nextProps) {
    if (
        this.props.location && 
        (this.props.location.pathname !== nextProps.location.pathname)) {
      this.setState({
        active: false
      }, () => {
        this.setState({
          active: true
        })
      });

    }
  }
  componentWillUnmount() {
    // IMPORTANT! Allow us to push new slot on other pages
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.length = 0;
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