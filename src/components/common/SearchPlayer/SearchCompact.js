import React from "react";
import styled, { css } from "styled-components";

import SearchMenu from "./SearchMenu";

const Search = styled.div`
  width: 35px;
  height: 35px;
  text-align: right;
  position: relative;
  margin-left: auto;
  .Search-Icon {
    position: absolute;
    z-index: 2;
    color: ${props => props.theme.text[500]};
    height: 100%;
    line-height: 35px;
    margin-left: -35px;
    font-size: 21px;
    text-align: center;
    width: 35px;
    cursor: pointer;
    height: 35px;
  }
`;

const SearchInput = styled.input`
  position: absolute;
  right: 0;
  outline: 0;
  border: 0;
  z-index: 1;
  border-radius: 5px;
  background: ${props => props.theme.background.listHover};
  color: ${props => props.theme.text[500]};
  padding: 10px 30px 10px 10px;
  height: 35px;
  font-size: 16px;
  width: 250px;
  transition: all 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  box-sizing: border-box;
  @media screen and (max-width: 790px) {
    ${props =>
      !props.isOpen &&
      css`
        width: 35px;
        font-size: 16px;
        color: transparent;
        padding: 0;
      `};
  }
`;

class SearchCompact extends React.Component {
  constructor() {
    super();

    this.timeout = null;

    this.state = {
      open: document.documentElement.clientWidth > 790 ? true : false,
      menuOpen: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onFocus = e => {
    this.setState({
      menuOpen: true,
    });
  };

  onBlur = e => {
    this.timeout = setTimeout(() => {
      this.setState(prevState => {
        let open = false;
        if (document.documentElement.clientWidth > 790) open = true;

        return {
          open,
          menuOpen: false,
        };
      });
    }, 200);
  };

  openMenu = () => {
    this.setState(
      {
        open: true,
      },
      () => {
        if (this.state.open) this.input.focus();
      }
    );
  };

  handleClick = e => {
    const { onSearch } = this.props;

    if (this.state.open) {
      onSearch();
      return;
    }
    return this.openMenu();
  };

  render() {
    const { status, onSearch, placeholder, onChange, value } = this.props;

    let icon = "fa fa-search";

    if (status === "loading") {
      icon = "fa fa-refresh fa-spin fa-3x fa-fw";
    } else if (status === "error") {
      icon = "fa fa fa-exclamation-triangle";
    }

    let ph = this.state.open ? placeholder : "";

    return (
      <Search>
        <form action="" onSubmit={onSearch}>
          <SearchInput
            type="text"
            innerRef={input => (this.input = input)}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            isOpen={this.state.open}
            placeholder={ph}
            onChange={onChange}
            value={value}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />

          <div
            className={`Search-Icon ${icon}`}
            onClick={this.handleClick}
          />
          {this.state.menuOpen && (
            <SearchMenu
              compact
              style={{
                width: "250px",
                right: -5,
                marginTop: "45px",
                textAlign: "left",
              }}
            />
          )}
        </form>
      </Search>
    );
  }
}

export default SearchCompact;
