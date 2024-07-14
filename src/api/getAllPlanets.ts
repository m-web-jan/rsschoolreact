export async function getPlanets(searchTerm: string, page: number) {
  try {
    const apiUrl = `https://swapi.dev/api/planets/?page=${page}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const filteredPlanets = data.results.filter((planet: { name: string }) =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { planets: filteredPlanets, count: data.count };
    } else {
      console.log('No planets found.');
      return { planets: [], count: 0 };
    }
  } catch (error) {
    console.error('Error fetching planets from SWAPI:', error);
    throw new Error('Failed to fetch planets');
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
