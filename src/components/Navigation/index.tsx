import React, { Component } from 'react';
import styled from 'styled-components';

const NavigationField = styled.div`
  column-gap: 0.5rem;
  display: flex;
  background-color: white;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.5rem 1rem;
  input {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  img {
    cursor: pointer;
    width: 1.5rem;
  }
`;

interface NavBarProps {
  search: () => void;
  change: (e: { target: { value: string } }) => void;
}

class NavBar extends Component<NavBarProps> {
  render() {
    return (
      <div>
        <NavigationField>
          <img onClick={this.props.search} src="./icons/search.png" alt="searchIcon" />
          <input type="text" placeholder="Поиск..." onChange={this.props.change} />
        </NavigationField>
      </div>
    );
  }
}

export default NavBar;
