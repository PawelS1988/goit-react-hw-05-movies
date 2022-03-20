import React, { useState, useEffect } from 'react';
import MovesLink from '../../components/MovesLink/MovesLink.jsx';
import styles from './MoviesPage.module.css';

const MoviesPage = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('no_move');

  useEffect(() => {
    const fetchMovies = searchMovies => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchMovies}`
      )
        .then(resp => resp.json())
        .then(movies => setMovies(movies.results))
        .catch(er => console.log('MoviesPage fetch error!' + er));
    };

    if (search === '') return; // query in fetch must have value
    fetchMovies(search);
  }, [apiKey, search]);

  return (
    <section className={styles.Wrapper}>
      <form
        className={styles.Form}
        onSubmit={e => {
          e.preventDefault();
          const {
            elements: { search },
          } = e.currentTarget;

          setSearch(search.value);
        }}
      >
        <input className={styles.Input} type="text" name="search" />
        <button className={styles.Button} type="submit">
          Search
        </button>
      </form>
      <MovesLink movies={movies} />
    </section>
  );
};

export default MoviesPage;
