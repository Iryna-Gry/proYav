import React, { useState, useEffect } from 'react';
import { fetchAPI } from 'services/fetchAPI';
import { MovieGallery, Loader } from 'components';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const page = 1;
    fetchAPI(page)
      .then(response => {
        setMovies([...response.results]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <div>
      {isLoading && <Loader></Loader>}
      {movies.length > 0 && <MovieGallery data={movies}></MovieGallery>}
      {error && <p>Something went wrong. Please, refresh the page</p>}
    </div>
  );
};
export default Home;
