import styled from "styled-components";
import { Link }   from 'react-router-dom';

export const Wrapper = styled(Link)`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(odd) {
    background: ${props => props.theme.background.boxOdd};
  }

  &:first-of-type {
    height: 95px;
  }
`;

export const Position = styled.div`
  min-width: 50px;
  font-size: 32px;
  color: ${props => props.theme.background.grey};
  text-align: right;
  font-weight: 500;
  margin-right: 5px;
  ${Wrapper}:first-of-type &{
    font-size: 72px;
    color: rgba(234, 203, 93, 1);
    /** What? To align the big number with the small */
    letter-spacing: -10px;
  }
`

export const Info = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Name = styled.div`
  display: flex;
  font-size: 14px;
  font-family: ${props => props.theme.font.highlight}, sans-serif;
  font-weight: bold;
  color: rgba(57, 57, 57, 1);
  margin-bottom: 1px;
  >span {
    font-size: 12px;
    align-self: flex-end;
    margin-left: 1px;
    /** lol, seriously? */
    padding-bottom: 1px;

    color: rgba(161, 161, 161, 1);
    font-weight: normal;
  }

  ${Wrapper}:first-of-type &{
    font-size: 18px;
  }
`;

export const SkillTier = styled.div`
  display: none;
  ${Wrapper}:first-of-type &{
    display: flex;
    color: #A3A3A3;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500; 
  }
`;

export const Stats = styled.div`
  display: flex;
  color: #A3A3A3;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 11px;
`;

export const Points = styled.div`
  font-size: 24px;
  padding: 0 30px;
  /* color: rgba(134, 200, 91, 1); */
`;

export const PointsName = styled.span`
  display: none;
  ${Wrapper}:first-of-type &{
    font-size: 11px;
    text-transform: uppercase;
    display: block;
    text-align: center;
    color: rgba(130, 130, 130, 1);
  }
`