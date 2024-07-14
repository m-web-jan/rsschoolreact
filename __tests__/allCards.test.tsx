import React from 'react';
import { render } from '@testing-library/react';
import ContentBlock from '../src/components/contentBlock';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

// Mock data for testing
const mockPlanets = [
  { name: 'Planet 1', terrain: 'Terrain 1', population: '1000' },
  { name: 'Planet 2', terrain: 'Terrain 2', population: '2000' },
];

describe('ContentBlock Component', () => {
  it('renders the specified number of cards', () => {
    const { getAllByTestId } = render(
      <ContentBlock planets={mockPlanets} onItemClick={() => {}} />
    );

    const cardElements = getAllByTestId('film-card');
    console.log(cardElements);

    expect(cardElements).toHaveLength(mockPlanets.length);
  });

  it('displays loading message when no cards are present', () => {
    const { getByText } = render(<ContentBlock planets={[]} onItemClick={() => {}} />);

    const loadingTextElement = getByText('Загрузка...');
    expect(loadingTextElement).toBeInTheDocument();
  });
});
