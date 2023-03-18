import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components./Header';
import Loading from '../components./Loading';
import { getUser } from '../services/userAPI';
import './CSS/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      perfilInfo: {},
    };
  }

  async componentDidMount() {
    const { perfilInfo } = this.state;
    // this.setState({ loading: true });
    const perfilInfoResponse = await getUser();
    this.setState({
      loading: false,
      perfilInfo: perfilInfoResponse,
    }, console.log(perfilInfo));
  }

  render() {
    const { loading, perfilInfo } = this.state;
    return (
      <div data-testid="page-profile">
        {loading ? <Loading />
          : (
            <div>
              <Header />
              <div
                id="page-profile"
              >
                <img
                  id="profile-image"
                  data-testid="profile-image"
                  src={ perfilInfo.image }
                  alt={ perfilInfo.name }
                />
                <div
                  id="profile-info"
                >
                  <h2>Nome</h2>
                  <p>{perfilInfo.name}</p>
                  <h2>E-mail</h2>
                  <p>{perfilInfo.email}</p>
                  <h2>Descrição</h2>
                  <p>{perfilInfo.description}</p>
                  <Link
                    id="edit-btn"
                    to="/profile/edit"
                  >
                    Editar perfil
                  </Link>
                </div>
              </div>

            </div>
          )}
      </div>
    );
  }
}

export default Profile;
