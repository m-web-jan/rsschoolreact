import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '../src/components/Pagination';

const TestComponent = ({ totalPages }) => {
  const location = useLocation();
  return (
    <>
      <Pagination totalPages={totalPages} />
      <div data-testid="location-display">{location.search}</div>
    </>
  );
};

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', () => {
    const totalPages = 5;

    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route path="/" element={<TestComponent totalPages={totalPages} />} />
        </Routes>
      </MemoryRouter>
    );

    const secondPageButton = getByText('2');
    fireEvent.click(secondPageButton);

    expect(getByTestId('location-display').textContent).toBe('?page=2');
  });
});
