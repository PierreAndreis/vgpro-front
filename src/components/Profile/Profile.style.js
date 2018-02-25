import styled from "styled-components";
import {commonWrapper} from "./../../styles/App.style";

export const Wrap = commonWrapper.extend`
  display: flex;
  position: relative;
  @media screen and (max-width: 1120px) {
    flex-wrap: wrap;
  }
`