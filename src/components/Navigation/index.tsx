import React from 'react';
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
    width: 1.5rem;
  }
`;

interface NavBarProps {
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NavBar: React.FC<NavBarProps> = ({ change }) => {
  return (
    <div>
      <NavigationField>
        <img src="./icons/search.png" alt="searchIcon" />
        <input type="text" placeholder="Поиск..." onChange={change} />
      </NavigationField>
    </div>
  );
};

export default NavBar;
