import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
      // favSongs: [],
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    // this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    const isFav = favSongs.some((song) => song.trackId === trackId);
    this.setState({
      checked: isFav,
      loading: false,
    });
  }

  // componentDidUpdate() {
  //   console.log('updated musiccard!');
  // }

  handleInput = async (event) => {
    // console.log(event.target.checked);
    const { trackObj } = this.props;
    this.setState({ loading: true });
    if (event.target.checked) {
      await addSong(trackObj);
      this.setState({
        loading: false,
        checked: true,
      });
    } else {
      await removeSong(trackObj);
      this.setState({
        loading: false,
        checked: false,
      });
    }
  };

  render() {
    const { loading, checked } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div>
        { loading ? <Loading />
          : (
            <div>
              <h3>{ trackName }</h3>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackId }>
                <input
                  type="checkbox"
                  checked={ checked }
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.handleInput }
                />
                Favorita
              </label>
            </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackObj: PropTypes.objectOf([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default MusicCard;
