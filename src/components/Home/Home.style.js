import styled from "styled-components";

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1050px;
	display: flex;
	flex-flow: row;
	justify-content: space-around;
  position: relative;
  flex-wrap: wrap;
`;

export const Logo = styled.div`
  box-sizing: border-box;
  max-width: 80%;
  padding: 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .img {
    box-sizing: border-box;
    width: 119px;
    height: 210px;
    background: url('/images/logo_shield.svg') no-repeat;
    background-size: 100%;
  }

  @media screen and (max-width: 568px) {
    width: 200px;
    height: 238px;
  }
`;