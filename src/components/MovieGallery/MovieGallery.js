import React from 'react';
import css from 'components/MovieGallery/MovieGallery.module.css';
import { MovieGalleryItem } from 'components';
import PropTypes from 'prop-types';

export const MovieGallery = ({ data }) => {
  return (
    <ul className={css.MovieGallery}>
      {data.map(({ id, poster_path, original_title, backdrop_path }) => {
        return (
          <MovieGalleryItem
            path={`/movies/${id}`}
            src={poster_path}
            key={id}
            id={id}
            alt={original_title}
            smallImageURL={poster_path}
            largeImageURL={backdrop_path}
          ></MovieGalleryItem>
        );
      })}
    </ul>
  );
};

MovieGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ),
  state: PropTypes.node,
};
