import React from 'react';
import styled from 'styled-components';
import FilmCard from '../card';

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 900px;
  margin: 3rem auto;
`;

const LoadingText = styled.p`
  text-align: center;
  margin-top: 100px;
  font-size: 2rem;
  color: white;
`;

interface IPlanet {
  name: string;
  terrain: string;
  population: string;
}

interface ContentBlockProps {
  planets: IPlanet[];
  onItemClick: (index: number) => void;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ planets, onItemClick }) => {
  if (planets?.length === 0) {
    return <LoadingText>Загрузка...</LoadingText>;
  }

  const handleItemClick = (index: number) => {
    onItemClick(index);
  };

  return (
    <div>
      <Content>
        {planets?.map((planet, index) => (
          <FilmCard key={index} planetData={planet} onClick={() => handleItemClick(index)} />
        ))}
      </Content>
    </div>
  );
};

export default ContentBlock;
