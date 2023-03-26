import './ImageGallery.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ data, hendleClickToImage }) => {
  return (
    <>
      <ul className="ImageGallery ">
        {data.map(el => (
          <li key={el.id} className="ImageGalleryItem">
            <img
              onClick={hendleClickToImage}
              className="ImageGalleryItem-image"
              src={el.webformatURL}
              alt={el.tags}
              data-largeimage={el.largeImageURL}
              data-tegs={el.tags}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  hendleClickToImage: PropTypes.func.isRequired,
};
