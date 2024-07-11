export async function getMovies(searchTerm = '') {
  try {
    const apiUrl = 'https://swapi.dev/api/films/';
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const filteredMovies = data.results.filter((film: { title: string }) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredMovies;
    } else {
      console.log('Фильмы не найдены.');
      return [];
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса к SWAPI:', error);
    return [];
  }
}
