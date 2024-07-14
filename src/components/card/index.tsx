import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  max-width: 250px;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
  img {
    width: 100%;
  }
  p {
    margin-top: 0.5rem;
    line-height: 1.5rem;
    max-height: 3rem;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden !important;
    -webkit-line-clamp: 4;
  }
`;

interface Props {
  planetData: {
    name: string;
    terrain: string;
    population: string;
  };
  onClick: () => void;
}

const FilmCard: React.FC<Props> = ({ planetData, onClick }) => {
  return (
    <Card onClick={onClick}>
      <img src="./images/swLogo.png" alt="swLogo" />
      <h2>{planetData.name}</h2>
      <p>Terrain: {planetData.terrain}</p>
      <p>Population: {planetData.population}</p>
    </Card>
  );
};

export default FilmCard;
