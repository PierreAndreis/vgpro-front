import styled, {css} from "styled-components";

export const SearchBar = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-width: 700px;
  margin: 0 auto 45px;
  padding: 0 20px;
  position: relative;
  box-sizing: border-box;
  font-size: 16px;
    i {
      font-size: 25px;
      text-align: center;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      color: rgb(110, 112, 117);
    }
  }
`;

export const SearchBarInput = styled.input`
  /* font-family: 'Roboto Condensed', sans-serif; */
  font-size: 100%;

  width: 100%;
  height: 70px;
  margin: 0 auto;
  padding: 5px 10px 5px 80px;
  border: 0;
  border-radius: 2px;
  outline: 0;

  background: white;
  /* background: red; */
  border-radius: 50px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
  box-shadow: #EAEDF3 0 10px 30px 0;
  box-sizing: border-box;
`;

export const SearchBarButton = styled.button`
  cursor: pointer;
  position: absolute;
  width: 70px;
  text-align: center;
  height: 70px;
  transform: all 300ms;
  border-radius: 50px 0 0 50px;
  border: 0;
  background: transparent;
  outline: 0;
  transition: all 300ms;
  ${(props) => props.isError && css`
    background-color: rgba(243, 156, 156, 0.747);
  `}
`;

