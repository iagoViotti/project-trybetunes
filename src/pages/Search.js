import React from 'react';
import Header from '../components./Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
    };
  }

  buttonDisabled = (event) => {
    const minCharacters = 2;
    if (event.target.value.length >= minCharacters) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.buttonDisabled }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
