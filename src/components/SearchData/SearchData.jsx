import PropTypes from 'prop-types';

const KEY = '33989696-bb179ecbc90f0d948b968d104';
const BASE_URL = 'https://pixabay.com/api/';

export const SearchData = async (searchWord, page) => {
  const data = await fetch(
    `${BASE_URL}?key=${KEY}&q=${searchWord}&per_page=12&page=${page}`
  );
  return data;
};

SearchData.propTypes = {
  searchWord: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
