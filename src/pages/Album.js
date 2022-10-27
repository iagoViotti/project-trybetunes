import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components./Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components./MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components./Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumInfo: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const albumInfo = await getMusics(match.params.id);
    this.setState({
      albumInfo,
      loading: true,
    });
    // const favSongs = await getFavoriteSongs();
    this.setState({ loading: false });
  }

  render() {
    const { albumInfo, loading } = this.state;
    const collectionInfo = albumInfo.filter((info) => info === albumInfo[0]);
    const albumTracksInfo = albumInfo.filter((info) => info !== albumInfo[0]);
    return (
      <div data-testid="page-album">
        <Header />
        { collectionInfo.map((info) => (
          <div key={ info.artistId }>
            <h2 data-testid="album-name">{info.collectionName}</h2>
            <h4 data-testid="artist-name">{info.artistName}</h4>
            <img
              src={ info.artworkUrl100 }
              alt={ info.collectionName }
            />
          </div>
        )) }
        { loading ? <Loading /> : (
          albumTracksInfo.map((track) => (
            <MusicCard
              key={ track.trackName }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              trackObj={ track }
            />
          )))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
