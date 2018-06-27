import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/styles";
const searchIcon = require("../../images/search.svg");

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  background-color: transparent;
  color: ${colors.theme5};
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 0.5px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
  background-color: transparent;
  margin: 0 10px;
`;

class SearchBar extends React.Component {
  state = {
    text: ""
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({ text: value });

    // run code to start searching for notes
  };

  render() {
    return (
      <Wrapper>
        <Icon src={searchIcon} alt="search" />
        <Input
          name="gitnotes-search"
          type="text"
          placeholder="Search for notes or keywords.."
          autocomplete="off"
          value={this.state.text}
          onChange={this.onChange}
        />
      </Wrapper>
    );
  }
}

export default SearchBar;
