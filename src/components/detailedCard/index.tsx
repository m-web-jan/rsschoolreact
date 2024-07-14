import React from 'react';
import styled from 'styled-components';
import { IPlanet } from '../../pages/main';

const DetailedCard = styled.div`
  margin-left: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  h2 {
    margin-top: 0;
  }
  p {
    margin: 0.5rem 0;
  }
  button {
    border: 1px solid black;
    padding: 0.2rem 1rem;
  }
`;

interface CardDetailsProps {
  selectedPlanet: IPlanet | null;
  closeDetails: () => void;
}

const CardDetails: React.FC<CardDetailsProps> = ({ selectedPlanet, closeDetails }) => {
  return (
    <DetailedCard>
      {selectedPlanet ? (
        <>
          <h2>{selectedPlanet?.name}</h2>
          <p>Terrain: {selectedPlanet?.terrain}</p>
          <p>Population: {selectedPlanet?.population}</p>
          <button className="button" onClick={closeDetails}>
            Закрыть
          </button>
        </>
      ) : (
        <p>Выберите планету, чтобы просмотреть подробности</p>
      )}
    </DetailedCard>
  );
};

export default CardDetails;
