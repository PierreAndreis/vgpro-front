import AssetLoader from "../../../common/AssetLoader";
import styled from "styled-components";


export const Builds = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

export const Item = styled(AssetLoader)`
  background-size: 110%;
  background-position: center center;
  background-color: ${props => props.theme.background.slot};
  border: 1px solid ${props => props.theme.background.slotBorder};

  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 2px;
`;