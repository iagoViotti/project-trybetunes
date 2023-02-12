import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components./Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from '../components./Loading';
import './CSS/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      buttonDisabled: true,
      loading: false,
      albunsInfo: [],
      artistName: '',
    };
  }

  searchButton = async () => {
    const { searchValue } = this.state;
    // console.log(searchValue);
    this.setState({ loading: true });
    const albunsInfo = await searchAlbumsAPIs(searchValue);
    this.setState({
      artistName: searchValue,
      searchValue: '',
      albunsInfo,
      loading: false,
    });
  };

  buttonDisabled = (event) => {
    const isEnabled = event.target.value.length >= 2;
    this.setState({
      buttonDisabled: !isEnabled,
      searchValue: event.target.value,
    });
  };

  render() {
    const { buttonDisabled, loading, searchValue, artistName, albunsInfo } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading && <Loading />}
        {!loading
          && (
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                value={ searchValue }
                onChange={ this.buttonDisabled }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.searchButton }
              >
                Pesquisar
              </button>
            </form>
          )}
        {artistName.length > 0 && !loading && albunsInfo.length === 0
          ? (
            <h1>Nenhum álbum foi encontrado</h1>
          )
          : artistName.length > 0 && !loading
            && (
              <div>
                <h1>
                  Resultado de Álbuns de:
                  {' '}
                  {artistName}
                </h1>
                {
                  albunsInfo.map((album) => (
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                      key={ album.collecionId }
                    >
                      <div>
                        <img
                          src={ album.artworkUrl100 }
                          alt={ album.collectionName }
                        />
                        <h4>{ album.collectionName }</h4>
                        <h6>{ album.artistName }</h6>
                      </div>
                    </Link>
                  ))
                }
              </div>
            )}
      </div>
    );
  }
}
export default Search;
