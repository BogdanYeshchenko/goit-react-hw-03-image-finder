import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { SearchData } from './SearchData/SearchData';

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
    windowHeight: null,
    windowWidth: null,
  };

  // const cenLoadMore = (this.state.totalHits/9) > this.state.page;

  componentDidMount() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    this.setState({ windowHeight, windowWidth });
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
        const answer = await SearchData(searchWord, page);
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

        console.log(answerJson);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        this.setState({ isLoding: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  hendleClickToImage = e => {
    console.log(e.target.dataset.largeimage, e.target.dataset.tegs);
    this.setState({
      largeimage: e.target.dataset.largeimage,
      tegs: e.target.dataset.tegs,
      isModalOpen: true,
    });
  };

  handleClicOnBackDrop = e => {
    if (e.target.dataset.backdrop) {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const {
      // searchWord,
      page,
      data,
      totalHits,
      isLoding,
      largeimage,
      tags,
      isModalOpen,
      // windowHeight,
      // windowWidth,
    } = this.state;
    return (
      <div>
        {isModalOpen && (
          <Modal
            largeimage={largeimage}
            tags={tags}
            handleClicOnBackDrop={this.handleClicOnBackDrop}
            // windowHeight={windowHeight}
            // windowWidth={windowWidth}
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
