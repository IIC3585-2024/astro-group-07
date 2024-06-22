export default async function getMoviesByName(name) {
  const token = import.meta.env.PUBLIC_TMDB_TOKEN
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
  }
  const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${name}&language=en-US`, options)
  const data = await response.json()
  return data.results
}