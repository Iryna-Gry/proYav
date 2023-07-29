import css from 'components/MovieGalleryItem/MovieGalleryItem.module.css';
import myImageUrl from 'images/sorry.png';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

export const MovieGalleryItem = ({ src, alt, largeImageURL, path }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  const noPosterImg = myImageUrl;
  const location = useLocation();

  return (
    <Link to={path} state={{ from: location }} className={css.MovieGalleryItem}>
      <img
        src={src === null ? noPosterImg : BASE_URL + src}
        alt={alt}
        source={largeImageURL === null ? noPosterImg : BASE_URL + largeImageURL}
        className={css['MovieGalleryItem-image']}
      />
      <h2 className={css.MovieGalleryTitle}>{alt}</h2>
    </Link>
  );
};

MovieGalleryItem.propTypes = {
  src: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
