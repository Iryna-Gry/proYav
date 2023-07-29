import React from 'react';
import css from 'components/MovieCard/MovieCard.module.css';
import myImageUrl from 'images/sorry.png';
import PropTypes from 'prop-types';

export const MovieCard = ({
  movie: {
    poster_path,
    original_title,
    release_date,
    vote_average,
    genres,
    overview,
  },
}) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  return (
    <div className={css.MovieDetails__container}>
      <div>
        <div className={css.Image__container}>
          <img
            src={poster_path ? BASE_URL + poster_path : myImageUrl}
            className={css.Movie__img}
            alt={original_title}
          />
        </div>
        <div className={css.MovieInfo_container}>
          <h1 className={css.Movie_title}>
            {original_title}
            <span>({parseInt(release_date)})</span>
          </h1>
          <p className={css.Movie__subtitle}>
            User Score: {Math.round(vote_average * 10)}%
          </p>

          <h2 className={css.Movie__chapterTitle}>Overview</h2>
          <p className={css.Movie__chapterText}>{overview}</p>

          <h2 className={css.Movie__chapterTitle}>Genres</h2>
          <p
            className={css.Movie__chapterText}
            style={{ color: 'crimson', fontWeight: '700' }}
          >
            {genres.map(item => item.name).join(' | ')}
          </p>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  poster_path: PropTypes.string,
  original_title: PropTypes.string,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.string),
  overview: PropTypes.string,
};
