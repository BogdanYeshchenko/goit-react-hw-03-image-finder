import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({
  largeimage,
  tags,
  handleClicOnBackDrop,
  //   windowHeight,
  //   windowWidth,
}) => {
  return (
    <div
      className={css.overlay}
      onClick={handleClicOnBackDrop}
      data-backdrop="true"
    >
      <div className={css.modal}>
        <img
          className={css.modalIng}
          src={largeimage}
          alt={tags}
          //   style={{
          //     maxWidth: `calc(${windowWidth}*0.9)`,
          //     maxHeight: `calc(${windowHeight}*0.9)`,
          //   }}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeimage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleClicOnBackDrop: PropTypes.func.isRequired,
};
