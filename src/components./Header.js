/* eslint-disable max-len */
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
                {image && <img
                  id="profile-picture"
                  alt={ name }
                  src={ image }
                />}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    {' '}
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397
                    1.398h-.001c.03.04.062.078.098.115l3.85
                    3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007
                    1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11
                    0 5.5 5.5 0 0 1 11 0z"
                    />
                    {' '}
                  </svg>
                  Search
                </Link>
                <Link
                  className="header-link"
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    {' '}
                    <path
                      d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389
                      2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                      0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83
                      4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525
                      0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0
                      0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                    />
                    {' '}

                  </svg>
                  Favorites
                </Link>
                <Link
                  className="header-link"
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {' '}
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#333333" />
                    {' '}
                    <path d="M12 35.6309C12 34.5972 12.772 33.7241 13.7995 33.6103C21.515 32.7559 26.5206 32.8325 34.218 33.6287C35.2324 33.7337 36 34.5918 36 35.6116C36 36.1807 35.7551 36.7275 35.3262 37.1014C26.2414 45.0195 21.0488 44.9103 12.6402 37.1087C12.2306 36.7286 12 36.1897 12 35.6309Z" fill="#333333" />
                    {' '}
                    <path fillRule="evenodd" clipRule="evenodd" d="M34.1151 34.6234C26.4784 33.8334 21.5449 33.7587 13.9095 34.6042C13.3954 34.6612 13 35.1002 13 35.6309C13 35.9171 13.1187 36.1885 13.3204 36.3757C17.4879 40.2423 20.6461 41.9887 23.7333 41.9999C26.8309 42.0113 30.1592 40.2783 34.6691 36.3476C34.8767 36.1667 35 35.8964 35 35.6116C35 35.0998 34.6154 34.6752 34.1151 34.6234ZM13.6894 32.6164C21.4852 31.7531 26.5628 31.8315 34.3209 32.6341C35.8495 32.7922 37 34.0838 37 35.6116C37 36.465 36.6336 37.2884 35.9832 37.8553C31.4083 41.8426 27.598 44.0141 23.726 43.9999C19.8435 43.9857 16.2011 41.7767 11.9601 37.8418C11.3425 37.2688 11 36.4624 11 35.6309C11 34.0943 12.1487 32.787 13.6894 32.6164Z" fill="#333333" />
                    {' '}
                    <path d="M32 20C32 24.4183 28.4183 28 24 28C19.5817 28 16 24.4183 16 20C16 15.5817 19.5817 12 24 12C28.4183 12 32 15.5817 32 20Z" fill="#333333" />
                    {' '}
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 26C27.3137 26 30 23.3137 30 20C30 16.6863 27.3137 14 24 14C20.6863 14 18 16.6863 18 20C18 23.3137 20.6863 26 24 26ZM24 28C28.4183 28 32 24.4183 32 20C32 15.5817 28.4183 12 24 12C19.5817 12 16 15.5817 16 20C16 24.4183 19.5817 28 24 28Z" fill="#333333" />
                    {' '}
                  </svg>
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
