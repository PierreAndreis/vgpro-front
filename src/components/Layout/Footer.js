import React from "react";
import { translate } from 'react-i18next';
import styled from "styled-components";

import {commonWrapper} from "./../../styles/App.style";

const Wrapper = styled.div`
  width: 100%;
  background: rgb(56, 56, 56);
  margin: 25px auto 0;
  padding: 5px;
  box-sizing: border-box;
  color: rgb(136, 136, 136);

  box-shadow: 0 -4px 2px -2px rgba(63, 63, 63, 0.12);
  font-size: 10px;
`;

const Content = commonWrapper.extend`
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
`;

const Partners = styled.div`
  width: 300px;
  margin: 15px 0;
`;

const PartnersLogos = styled.div`
  display: flex;
  margin-top: 10px;

  div {
    background-size: 100%;
    background-position: center center;
    background-repeat: no-repeat;
  }

  .ezl-logo {
    background-image: url("/images/ext/ezl.png");
    width: 70px;
    height: 30px;
  }
  .vyz-logo {
    background-image: url("/images/ext/vyz.png");
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`

class Footer extends React.PureComponent {  
  render() {
    const {t} = this.props;

    return (
    <Wrapper>
      <Content>
        <div>
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
        <Partners>
          Partners:
          <PartnersLogos>
            <div className="ezl-logo" />
            <div className="vyz-logo" />
          </PartnersLogos>
        </Partners>
      </Content>
    </Wrapper>
    )
  }
}

export default translate()(Footer);