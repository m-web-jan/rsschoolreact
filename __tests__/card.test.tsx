import Card from '../src/components/card';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe('Tests for the Card component:', () => {
  const planetData = {
    name: 'Tatooine',
    terrain: 'Desert',
    population: '200000',
  };

  const mockFetchDetails = jest.fn();

  it('Ensure that the card component renders the relevant card data', () => {
    const { getByText } = render(<Card planetData={planetData} onClick={mockFetchDetails} />);

    expect(getByText('Tatooine')).toBeInTheDocument();
    expect(getByText('Terrain: Desert')).toBeInTheDocument();
    expect(getByText('Population: 200000')).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const { getByText } = render(<Card planetData={planetData} onClick={mockFetchDetails} />);

    fireEvent.click(getByText('Tatooine'));

    expect(mockFetchDetails).toHaveBeenCalled();

    await waitFor(() => {
      expect(getByText('Tatooine')).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const mockFetchFunction = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ details: 'Detailed Information' }),
    });

    global.fetch = mockFetchFunction;

    const handleClick = async () => {
      await mockFetchFunction();
    };

    const { getByText } = render(<Card planetData={planetData} onClick={handleClick} />);

    fireEvent.click(getByText('Tatooine'));

    await waitFor(() => {
      expect(mockFetchFunction).toHaveBeenCalled();
    });
  });
});
