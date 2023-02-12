import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components./Loading';
import './CSS/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      submitButtonDisabled: true,
      userName: '',
      loading: false,
    };
  }

  disabledCheck = (event) => {
    const minCharacters = 3;
    if (event.target.value.length >= minCharacters) {
      this.setState({
        submitButtonDisabled: false,
        userName: event.target.value,
      });
    } else {
      this.setState({
        submitButtonDisabled: true,
        userName: event.target.value,
      });
    }
  };

  submitButton = () => {
    const { history } = this.props;
    const { userName } = this.state;
    console.log(this.props);
    this.setState({
      loading: true,
    });
    createUser({ name: userName })
      .then(() => history.push('/search'));
  };

  render() {
    const { submitButtonDisabled, loading, userName } = this.state;
    return (loading
      ? <Loading />
      : (
        <div
          data-testid="page-login"
          id="page-login"
        >
          <h1>
            LOGIN
          </h1>
          <form>
            <input
              id="login-input"
              type="text"
              data-testid="login-name-input"
              value={ userName }
              placeholder="insert your name here"
              onChange={ this.disabledCheck }
            />
            <button
              id="login-button"
              type="button"
              data-testid="login-submit-button"
              onClick={ this.submitButton }
              disabled={ submitButtonDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
      )
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
