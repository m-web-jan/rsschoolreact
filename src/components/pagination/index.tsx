import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ddd;
  }

  &.active {
    background-color: #333;
    color: white;
  }
`;

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get('page') || '1', 10);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      params.set('page', page.toString());
      navigate({ search: params.toString() });
    }
  };

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <PageButton
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
      >
        {index + 1}
      </PageButton>
    ));
  };

  return <PaginationWrapper>{renderPageButtons()}</PaginationWrapper>;
};

export default Pagination;
