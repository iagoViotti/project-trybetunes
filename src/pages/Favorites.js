import React from 'react';
import Header from '../components./Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components./Loading';
import MusicCard from '../components./MusicCard';
import './CSS/Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favSongs: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favSongs,
    });
  }

  render() {
    const { favSongs, loading } = this.state;
    return (
      <div
        id="page-favorites"
        data-testid="page-favorites"
      >
        <Header />
        { loading ? <Loading /> : (
          favSongs.map((track) => (
            <div
              className="favorite-music-card"
              key={ track.trackId }
            >
              <MusicCard
                key={ track.trackName }
                trackName={ track.trackName }
                previewUrl={ track.previewUrl }
                trackId={ track.trackId }
                trackObj={ track }
              />
            </div>
          )))}
      </div>
    );
  }
}

export default Favorites;
