import styled from "styled-components";

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  padding: 10px 5px;
  box-sizing: border-box;

  & > div:first-of-type {
    color: ${props => props.theme.primary[400]};
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    text-transform: capitalize;
    width: 120px;
  }

  & > div {
    width: 90px;
    padding: 0 10px;
    font-size: 16px;
    box-sizing: border-box;
    text-align: center;
    font-weight: 700;
    color: ${props => props.theme.text[400]};
  }

  &:nth-child(odd) {
    background: ${props => props.theme.background.listOdd};
  }

  ${Table} &:first-of-type {
    background: ${props => props.theme.background.box};
    & > div {
      font-weight: bold;
      font-size: 12px;
      text-transform: uppercase;
      color: ${props => props.theme.text[300]};
    }
  }
`;
