import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../pages/CSS/Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
      image: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name, image } = await getUser();
    this.setState({
      name,
      image,
      loading: false,
    });
  };

  render() {
    const { name, loading, image } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading />
          : (
            <div
              id="header"
            >
              <div
                id="header-profile"
              >
                <img
                  id="profile-picture"
                  alt={ name }
                  src={ image }
                />
                <h1 data-testid="header-user-name">
                  { name }
                </h1>
              </div>
              <div
                id="header-links"
              >
                <Link
                  className="header-link"
                  data-testid="link-to-search"
                  to="/search"
                >
                  Search
                </Link>
                <Link
                  className="header-link"
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  Favorites
                </Link>
                <Link
                  className="header-link"
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  Profile
                </Link>
              </div>
            </div>
          ) }
      </header>
    );
  }
}

export default Header;
