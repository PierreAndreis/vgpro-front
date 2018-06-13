import React from "react";
import { translate } from "react-i18next";
import styled from "styled-components";

import { commonWrapper } from "./../../styles/App.style";

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.background.footer};
  margin: 25px auto 0;
  padding: 5px;
  box-sizing: border-box;
  color: ${props => props.theme.text[300]};

  box-shadow: 0 -10px 30px ${props => props.theme.shadow};
  font-size: 10px;
`;

const VGPROLogo = styled.div`
  background: url("/images/logo_shield.svg") no-repeat;
  background-size: 100%;
  background-position: center center;
  width: 40px;
  height: 65px;

  margin-right: 10px;
`;

const Content = commonWrapper.extend`
  max-width: 1300px;
  display: flex;
  align-items: center;
`;

const Partners = styled.div`
  width: 300px;
  margin: 15px 0;
  margin-left: auto;
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
`;

class Footer extends React.PureComponent {
  render() {
    const { t } = this.props;

    return (
      <Wrapper>
        <Content>
          <VGPROLogo />
          <div>
            <p>Copyright © 2018 VGPRO.gg</p>
            <p>{t("footer.copy")}</p>
            <p>
              Made by{" "}
              <a
                href="https://twitter.com/@4ever_vg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pierre Ortega
              </a>,{" "}
              <a
                href="https://twitter.com/AngeloCant1"
                target="_blank"
                rel="noopener noreferrer"
              >
                AngeloCant1
              </a>{" "}
              and{" "}
              <a
                href="https://twitter.com/IGNSkillz4Killz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Skillz4Killz
              </a>.<br /> Algorithms by{" "}
              <a
                href="https://twitter.com/vyzeox"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vyzeox
              </a>
            </p>
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
    );
  }
}

export default translate()(Footer);
