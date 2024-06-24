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
  
  // get genres
  const genres = await fetch(`https://api.themoviedb.org/3/genre/tv/list`, options)
  const genreList = await genres.json()

  // add genre names to series
  data.results.forEach(series => {
    series.genre_names = series.genre_ids.map(id => {
      const genre = genreList.genres.find(genre => genre.id === id)
      return genre.name
    }).join(", ")
  })

  return data.results.slice(0, 5)
}