import React from "react";
import { translate } from 'react-i18next';

import "./Footer.css";

class Footer extends React.PureComponent {
  componentDidMount(){
  }
  
  render() {
    const {t} = this.props;

    return (
    <div className="Footer">
      <div className="wrap Footer-Wrap">
        {/* <div className="Footer-Logo" /> */}
        <div className="Footer-text">
          <p>
            Copyright © 2017 VGPRO.gg
          </p>
          <p>
            {t('footer-data')}
            {" "}
            <a href="https://madglory.com/" target="_blank" rel="noopener noreferrer" >Madglory</a> and <a href="http://superevilmegacorp.com" target="_blank" rel="noopener noreferrer" >Super Evil Megacorp</a>.
          </p>
          <p>{t('footer-copy')}</p>
        </div>
        <div className="Footer-Partners">
          Partners:
          <div className="Footer-Partners_logos">
            <div className="ezl-logo" />
            <div className="vyz-logo" />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default translate()(Footer);