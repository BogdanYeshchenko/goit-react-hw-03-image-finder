import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ largeimage, tags, handleClicOnBackDrop }) => {
  return (
    <div
      className={css.overlay}
      onClick={handleClicOnBackDrop}
      data-backdrop="true"
    >
      <div className={css.modal}>
        <img className={css.modalImg} src={largeimage} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeimage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleClicOnBackDrop: PropTypes.func.isRequired,
};
