import styled from 'styled-components';

const Card = styled.div`
  max-width: 250px;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
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

export const FilmCard = ({ ...props }) => {
  return (
    <Card>
      <img src="./images/swLogo.png" alt="swLogo" />
      <h2>{props.filmData.title}</h2>
      <p>{props.filmData.opening_crawl}</p>
    </Card>
  );
};
