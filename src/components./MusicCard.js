import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  handleInput = async (event) => {
    const { trackObj } = this.props;
    this.setState({ loading: true });
    await addSong(trackObj);
    this.setState({
      loading: false,
      checked: true,
    });
    // console.log(event.target);
    // console.log(trackObj);
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
                  onClick={ this.handleInput }
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

};

export default MusicCard;
