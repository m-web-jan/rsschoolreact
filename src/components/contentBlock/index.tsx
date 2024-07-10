import { Component } from 'react';
import styled from 'styled-components';
import { FilmCard } from '../card';

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

interface IFilm {
  title: string;
  opening_crawl: string;
}

interface ContentBlockProps {
  films: IFilm[];
}

class ContentBlock extends Component<ContentBlockProps> {
  render() {
    const { films } = this.props;

    if (films.length === 0) {
      return <LoadingText>Loading...</LoadingText>;
    }

    return (
      <div>
        <Content>
          {films.map((film, index) => (
            <FilmCard key={index} filmData={film}></FilmCard>
          ))}
        </Content>
      </div>
    );
  }
}

export default ContentBlock;
