import './button.css';
import PropTypes from 'prop-types';

export const Button = ({ handleLoadMore }) => {
  return (
    <div>
      <button type="button" className="Button" onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
