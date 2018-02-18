import styled from "styled-components";
import {Box, BoxTitle, BoxBody, BoxActions} from "./../../common/Box";


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