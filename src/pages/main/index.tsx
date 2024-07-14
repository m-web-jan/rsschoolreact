import React, { useState, useEffect, ChangeEvent } from 'react';
import './style.css';
import ErrorBoundary from '../../components/errorBlock';
import NavBar from '../../components/Navigation';
import ContentBlock from '../../components/contentBlock';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPlanets, getPlanetDetails } from '../../api/getAllPlanets';

interface IPlanet {
  name: string;
  terrain: string;
  population: string;
  diameter: string;
  climate: string;
  gravity: string;
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
  const [inputText, setInputText] = useState<string>(searchText);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planetsData = await getPlanets(searchText);
        setPlanets(planetsData);
      } catch (error) {
        setThrowError(true);
      }
    };

    fetchData();
  }, [searchText]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const detailsParam = params.get('details');

    if (detailsParam && selectedPlanet === null) {
      const index = parseInt(detailsParam, 10);
      if (!isNaN(index) && index >= 0 && index < planets.length) {
        const selected = planets[index];
        fetchPlanetDetails(selected);
      }
    }
  }, [location.search, planets, selectedPlanet]);

  const fetchPlanetDetails = async (planet: IPlanet) => {
    try {
      const details = await getPlanetDetails(planet.name);
      setSelectedPlanet({ ...planet, ...details });
    } catch (error) {
      console.error('Error fetching planet details:', error);
      setThrowError(true);
    }
  };

  const search = () => {
    setSearchText(inputText);
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    setThrowError(true);
  };

  const handlePlanetClick = (index: number) => {
    navigate(`/?frontpage=${index}&details=${index}`);
    const selected = planets[index];
    fetchPlanetDetails(selected);
  };

  const closeDetails = () => {
    setSelectedPlanet(null);
    navigate('/');
  };

  return (
    <div className="background">
      <ErrorBoundary>
        {throwError ? (
          <div>Что-то пошло не так. Пожалуйста, перезагрузите страницу.</div>
        ) : (
          <>
            <Link className="button" to={'/notfound'}>
              404
            </Link>
            <button className="button" onClick={handleClick}>
              Выбросить ошибку
            </button>
            <NavBar search={search} change={change} />
            <div className="split-view">
              <div className="left-section">
                <ContentBlock planets={planets} onItemClick={handlePlanetClick} />
              </div>
              <div className="right-section">
                {selectedPlanet ? (
                  <>
                    <h2>{selectedPlanet.name}</h2>
                    <p>Terrain: {selectedPlanet.terrain}</p>
                    <p>Population: {selectedPlanet.population}</p>
                    <p>Diameter: {selectedPlanet.diameter}</p>
                    <p>Climate: {selectedPlanet.climate}</p>
                    <p>Gravity: {selectedPlanet.gravity}</p>
                    <button className="button border" onClick={closeDetails}>
                      Close
                    </button>
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
