import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { searchData } from '../service/SearchData/SearchData';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchWord: '',
    page: 1,
    data: [],
    totalHits: 0,
    largeimage: '',
    tags: '',
    isModalOpen: false,
    isLoding: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlePressKeybord);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressKeybord);
  }

  handlePressKeybord = e => {
    if (e.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  handleSubmit = value => {
    this.setState({ searchWord: value, page: 1, data: [] });
  };

  async componentDidUpdate(_, prevState) {
    const { searchWord, page, totalHits } = this.state;
    if (prevState.page !== page || prevState.searchWord !== searchWord) {
      try {
        this.setState({ isLoding: true });
        const answer = await searchData(searchWord, page);
        const answerJson = await answer.json();

        this.setState(prev => ({
          data: [...prev.data, ...answerJson.hits],
          totalHits: Math.ceil(answerJson.totalHits / 12),
        }));

        if (answerJson.totalHits === 0) {
          toast.warn('Do not faund any images', {
            theme: 'dark',
          });
        }

        if (answerJson.totalHits > 0 && page === 1) {
          toast.info(`You faund ${answerJson.totalHits} images`, {
            theme: 'dark',
          });
        }

        if (totalHits === page) {
          toast.warn('It is last images', {
            theme: 'dark',
          });
        }
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      } finally {
        this.setState({ isLoding: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  hendleClickToImage = e => {
    this.setState({
      largeimage: e.target.dataset.largeimage,
      tags: e.target.dataset.tags,
      isModalOpen: true,
    });
  };

  handleClicOnBackDrop = e => {
    if (e.target.dataset.backdrop) {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { page, data, totalHits, isLoding, largeimage, tags, isModalOpen } =
      this.state;
    return (
      <div>
        {isModalOpen && (
          <Modal
            largeimage={largeimage}
            tags={tags}
            handleClicOnBackDrop={this.handleClicOnBackDrop}
          />
        )}
        <Searchbar handleSubmit={this.handleSubmit} />
        {data && (
          <ImageGallery
            data={data}
            hendleClickToImage={this.hendleClickToImage}
          />
        )}
        {isLoding && <Loader />}

        {page < totalHits && data.length > 0 && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}

        <ToastContainer />
      </div>
    );
  }
}
