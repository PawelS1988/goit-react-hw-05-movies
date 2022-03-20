import React, { useState, useEffect } from 'react';
import MovesLink from '../../components/MovesLink/MovesLink.jsx';

const HomePage = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingMoves = () => {
      fetch(
        'https://api.themoviedb.org/3/trending/all/day?api_key=62e18f2bbf2294ce6ea3f49ffd7e99af'
      )
        .then(resp => resp.json())
        .then(trending => setTrending(trending.results));
    };
    fetchTrendingMoves();
  }, []);

  return (
    <main>
      <MovesLink movies={trending} />
    </main>
  );
};

export default HomePage;
