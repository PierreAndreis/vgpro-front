import styled, { css } from "styled-components";
import AssetLoader from "../../../common/AssetLoader";
import Button from "../../../common/Button";

export const Sidebar = styled.div`
  width: 100%;
  font-size: 13px;
  color: ${props => props.theme.text[400]};
`;

export const Content = styled.div`
  width: 100%;
  grid-column: 2 / 4;
  grid-row: 1 / 1;

  display: flex;
  flex-wrap: wrap;
  }
`;

export const BackButton = styled(Button)`
  margin: 0 2px;
`;
