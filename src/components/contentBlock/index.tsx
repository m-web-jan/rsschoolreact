import styled from 'styled-components';
import { getMovies } from '../../api/getAllPlanets';
import { useEffect, useState } from 'react';
import { FilmCard } from '../card';

interface Ifilm {
  title: string;
  opening_crawl: string;
}

const NavigationField = styled.div`
  column-gap: 0.5rem;
  display: flex;
  background-color: white;
  max-width: 300px;
  margin: 0 auto;
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.5rem 1rem;
  input {
    outline: none;
    border: none;
    font-size: 1rem;
  }
  img {
    cursor: pointer;
    width: 1.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 900px;
  margin: 3rem auto;
`;

export const ContentBlock = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [searchText, setSearchText] = useState('');

  function serchFilms() {
    localStorage.setItem('searchText', searchText);

    setAllFilms(
      filteredFilms.filter((film: Ifilm) =>
        film.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies();
        setAllFilms(data);
        setFilteredFilms(data);

        if (localStorage.getItem('searchText')) {
          setAllFilms(
            data.filter((film: Ifilm) =>
              film.title.toLowerCase().includes(localStorage.getItem('searchText')!.toLowerCase())
            )
          );
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavigationField>
        <img onClick={serchFilms} src="./icons/search.png" alt="serachIcon" />
        <input
          type="text"
          placeholder="Поиск..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </NavigationField>
      <Content>
        {allFilms.map((film: { title: string; opening_crawl: string }, index: number) => (
          <FilmCard key={index} filmData={film}></FilmCard>
        ))}
      </Content>
    </div>
  );
};
