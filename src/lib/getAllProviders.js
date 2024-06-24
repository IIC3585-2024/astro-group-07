export default async function getAllProviders() {
  const url = `https://api.themoviedb.org/3/watch/providers/tv?language=en-US&watch_region=CL`;
  const token = import.meta.env.PUBLIC_TMDB_TOKEN
  const options = {
      method: 'GET', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data.results.CL.flatrate;
}