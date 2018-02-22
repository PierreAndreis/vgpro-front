import styled from "styled-components";
import {Box, BoxTitle, BoxBody} from "./../../common/Box";


export const Wrapper = styled(Box)`
  height: 340px;
`;

export const Body = styled(BoxBody)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Title = styled(BoxTitle)`
  display: flex;
  height: 56px;
  position: relative;
`

export const Top3 = styled.div`
  width: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
`

export const Others = styled.div`
  width: 100%;
  /* padding: 0 15px; */
  box-sizing: border-box;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: "fadeInUp";
`