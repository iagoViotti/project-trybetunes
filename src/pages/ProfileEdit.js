import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components./Header';
import Loading from '../components./Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loading: false,
      userInfo: {},
      disable: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    // this.setState({ loading: true });
    const userInfoObj = await getUser();
    this.setState({
      loading: false,
      userInfo: userInfoObj,
    }, () => this.renderUserInfo());
  };

  renderUserInfo = () => {
    const { userInfo } = this.state;
    // console.log(userInfo);
    this.setState({
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      description: userInfo.description,
    });
  };

  disableCheck = () => {
    const { name, email, image } = this.state;
    const validateName = name.length > 0;
    const validateEmail = email.length > 0;
    const validateImage = image.length > 0;
    const validateAll = validateEmail && validateName && validateImage;
    // console.log(validateAll);
    if (validateAll) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  };

  inputChange = (event) => {
    const { target } = event;
    // console.log(target.name);
    this.setState({
      [target.name]: target.value,
    }, () => this.disableCheck());
  };

  submitButton = async () => {
    const { name, description, email, image } = this.state;
    const { history } = this.props;
    const newUserInfo = {
      name,
      description,
      email,
      image,
    };
    this.setState({ loading: true });
    await updateUser(newUserInfo);
    this.setState({ loading: false });
    history.push('/profile');
  };

  render() {
    const { loading, disable, name, email, image, description } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading
          ? <Loading />
          : (
            <form>
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                // placeholder="Your Name Here"
                onChange={ this.inputChange }
              />
              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                // placeholder="Your E-mail Here"
                onChange={ this.inputChange }
              />
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                value={ image }
                // placeholder="Your Image Url Here"
                onChange={ this.inputChange }
              />
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                value={ description }
                // placeholder="Your Description Here"
                onChange={ this.inputChange }
              />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ disable }
                onClick={ this.submitButton }
              >
                Editar perfil
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
