import { useState, useEffect, ChangeEvent } from 'react';
import './style.css';
import ErrorBoundary from '../../components/errorBlock';
import NavBar from '../../components/Navigation';
import ContentBlock from '../../components/contentBlock';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPlanets, getPlanetDetails } from '../../api/getAllPlanets';
import Pagination from '../../components/pagination';

interface IPlanet {
  name: string;
  terrain: string;
  population: string;
}

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return [storedValue, setValue] as const;
};

const MainPage = () => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const [throwError, setThrowError] = useState<boolean>(false);
  const [selectedPlanet, setSelectedPlanet] = useState<IPlanet | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get('page') || '1', 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { planets: fetchedPlanets, count } = await getPlanets(searchText, currentPage);
        setPlanets(fetchedPlanets);
        setTotalPages(Math.ceil(count / 10));
      } catch (error) {
        console.error('Error fetching planets:', error);
        setThrowError(true);
      }
    };

    fetchData();
  }, [searchText, currentPage]);

  useEffect(() => {
    const detailsParam = params.get('details');

    if (detailsParam !== null) {
      const index = parseInt(detailsParam, 10);
      if (!isNaN(index) && index >= 0 && index < planets.length) {
        const selected = planets[index];
        fetchPlanetDetails(selected);
      }
    }
  }, [location.search, planets]);

  const fetchPlanetDetails = async (planet: IPlanet) => {
    try {
      const details = await getPlanetDetails(planet.name);
      setSelectedPlanet({ ...planet, ...details });
    } catch (error) {
      console.error('Error fetching planet details:', error);
      setThrowError(true);
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClick = () => {
    setThrowError(true);
  };

  const handlePlanetClick = (index: number) => {
    navigate(`/?page=${currentPage}&details=${index}`);
    setSelectedPlanet(planets[index]);
  };

  const closeDetails = () => {
    setSelectedPlanet(null);
    params.delete('details');
    navigate({ search: params.toString() });
  };

  return (
    <div className="background">
      <ErrorBoundary>
        {throwError ? (
          <div>Something went wrong. Please reload the page.</div>
        ) : (
          <>
            <Link className="button" to={'/notfound'}>
              404
            </Link>
            <button className="button" onClick={handleClick}>
              Throw Error
            </button>
            <NavBar change={change} />
            <div className="split-view">
              <div className="left-section">
                <ContentBlock planets={planets} onItemClick={handlePlanetClick} />
                <Pagination totalPages={totalPages} />
              </div>
              <div className="right-section">
                {selectedPlanet ? (
                  <>
                    <h2>{selectedPlanet.name}</h2>
                    <p>Terrain: {selectedPlanet.terrain}</p>
                    <p>Population: {selectedPlanet.population}</p>
                    <button onClick={closeDetails}>Close</button>
                  </>
                ) : (
                  <p>Выберите планету, чтобы просмотреть подробности</p>
                )}
              </div>
            </div>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default MainPage;
