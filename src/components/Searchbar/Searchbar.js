import { useState } from 'react';
import css from 'components/Searchbar/Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

export const Searchbar = ({ onFormSubmit }) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = event => setKeyword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();

    onFormSubmit(keyword.trim());
    setKeyword('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
          <AiOutlineSearch size="35px" />
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleInputChange}
          placeholder="Search movies"
          value={keyword}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
