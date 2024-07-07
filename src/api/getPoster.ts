export async function getPosterByName(name: string) {
  const url = `https://imdb188.p.rapidapi.com/api/v1/searchIMDB?query=${name}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '2ab0b70199mshb1e925bfdf5c5c9p1d787ejsneac3d82fcea9',
      'x-rapidapi-host': 'imdb188.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
