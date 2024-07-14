export async function getPlanets(searchTerm = '') {
  try {
    const apiUrl = 'https://swapi.dev/api/planets/';
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const filteredPlanets = data.results.filter((planet: { name: string }) =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredPlanets;
    } else {
      console.log('Планеты не найдены.');
      return [];
    }
  } catch (error) {
    console.error('Ошибка при выполнении запроса к SWAPI:', error);
    return [];
  }
}

export async function getPlanetDetails(planetName: string) {
  try {
    const apiUrl = `https://swapi.dev/api/planets/?search=${encodeURIComponent(planetName)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const planet = data.results[0];
      return {
        name: planet.name,
        terrain: planet.terrain,
        population: planet.population,
      };
    } else {
      console.log(`Planet '${planetName}' details not found.`);
      return {
        name: '',
        terrain: '',
        population: '',
      };
    }
  } catch (error) {
    console.error('Error fetching planet details:', error);
    throw new Error('Failed to fetch planet details');
  }
}
