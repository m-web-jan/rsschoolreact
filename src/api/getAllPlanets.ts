// import { getPosterByName } from './getPoster';

export async function getMovies() {
  // getPosterByName('starwarsRevengeoftheSith');

  try {
    const apiUrl = 'https://swapi.dev/api/films/';
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results;
    } else {
      console.log('Фильмы не найдены.');
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса к SWAPI:', error);
  }
}
