import { Component } from 'react';
import './Searchbar.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleSearchWord = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchWord } = this.state;

    this.props.handleSubmit(searchWord);
  };

  render() {
    const { searchWord } = this.state;

    return (
      <header className="searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <label className="label">
            <button type="submit" className="button-submit">
              <svg width="32" height="32">
                <path
                  fill="#59596f"
                  d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"
                ></path>
              </svg>
            </button>
            <input
              value={searchWord}
              onChange={this.handleSearchWord}
              name="searchWord"
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
