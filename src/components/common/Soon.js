import React from "react";
import Helmet from "react-helmet";

import styled from "styled-components";

const SoonWrapper = styled.div`
  margin: 20px auto;
  text-align: center;

  h3 {
    font-size: 60px;
    font-style: italic;
    color: rgba(71, 71, 71, 0.404);
    font-weight: 500;
    text-decoration: italic;
  }
`;

const Soon = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Soon</title>
      </Helmet>
        <SoonWrapper>
          <h3>SOON.</h3>
        </SoonWrapper>
    </React.Fragment>
  )
}

export default Soon;