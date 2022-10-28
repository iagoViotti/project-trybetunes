import React from 'react';
import Header from '../components./Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components./Loading';
import MusicCard from '../components./MusicCard';

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

    // console.log(favSongs);
  }

  componentDidUpdate() {
    console.log('updated fav!');
  }

  render() {
    const { favSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : (
          favSongs.map((track) => (
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

export default Favorites;
