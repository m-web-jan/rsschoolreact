import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardDetails from '../src/components/detailedCard';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { IPlanet } from '../src/pages/main';

const mockPlanet = {
  name: 'Tatooine',
  terrain: 'Desert',
  population: '200000',
};

const WrapperComponent: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | null>(mockPlanet);

  const handleClose = () => setSelectedPlanet(null);

  return <CardDetails selectedPlanet={selectedPlanet} closeDetails={handleClose} />;
};

describe('Detailed Card Component', () => {
  it('displays a loading indicator while fetching data', () => {
    const { getByText } = render(<CardDetails selectedPlanet={null} closeDetails={() => {}} />);

    const loadingElement = getByText('Выберите планету, чтобы просмотреть подробности');
    expect(loadingElement).toBeInTheDocument();
  });

  it('displays detailed card data when planet is selected', () => {
    const { getByText } = render(<WrapperComponent />);

    expect(getByText('Tatooine')).toBeInTheDocument();
    expect(getByText('Terrain: Desert')).toBeInTheDocument();
    expect(getByText('Population: 200000')).toBeInTheDocument();
  });

  it('hides the component when close button is clicked', () => {
    const { getByText, queryByText } = render(<WrapperComponent />);

    expect(getByText('Tatooine')).toBeInTheDocument();
    expect(getByText('Terrain: Desert')).toBeInTheDocument();
    expect(getByText('Population: 200000')).toBeInTheDocument();

    const closeButton = getByText('Закрыть');
    fireEvent.click(closeButton);

    expect(queryByText('Tatooine')).toBeNull();
    expect(queryByText('Terrain: Desert')).toBeNull();
    expect(queryByText('Population: 200000')).toBeNull();
    expect(queryByText('Выберите планету, чтобы просмотреть подробности')).toBeInTheDocument();
  });
});
