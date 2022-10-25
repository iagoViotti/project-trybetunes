import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

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
    // createUser(userName);
    this.setState({
      loading: true,
    });
    createUser({ name: userName })
      .then(() => history.push('/search'));
    // console.log(this.props);
    // console.log('click');
  };

  render() {
    const { submitButtonDisabled, loading, userName } = this.state;
    return (loading
      ? <Loading />
      : (
        <div data-testid="page-login">
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              value={ userName }
              onChange={ this.disabledCheck }
            />
            <button
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
