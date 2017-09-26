import React from "react";

import { translate } from 'react-i18next';

const Footer = ({t, i18n}) => (
<div className="aboutus">
      <div className="wrap">
        <div className="aboutuswrap">
          <div className="logo"></div>
          <div className="aboutus_text">
            <p>
              Copyright © 2017 vgpro.gg All rights reserved.
            </p>
            <p>
              {t('footer-data')}
              {" "}
              <a href="https://madglory.com/" target="_blank" rel="noopener noreferrer" >Madglory</a> and <a href="http://superevilmegacorp.com" target="_blank" rel="noopener noreferrer" >Super Evil Megacorp</a>.
            </p>
            <p>{t('footer-copy')}</p>
          </div>
        </div>
      </div>
    </div>
);

export default translate()(Footer);