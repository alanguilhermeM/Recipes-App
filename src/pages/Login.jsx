import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Login({ history }) {
  const [inputValues, setInputValues] = useState({
    password: '',
    email: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const passwordValidation = () => {
    const { password } = inputValues;
    const limit = 6;
    return password.length >= limit;
  };

  const emailValidation = () => {
    const { email } = inputValues;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/g;
    return email.match(regex);
  };

  const inputValidation = () => {
    const isValid = emailValidation() && passwordValidation();
    setIsDisabled(!isValid);
  };

  const inputHandle = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
    inputValidation();
  };

  const submitHandle = () => {
    localStorage.setItem('user', JSON.stringify({ email: inputValues.email }));
    history.push('/meals');
  };

  return (
    <section id="section-login-inputs">
      <input
        type="text"
        data-testid="email-input"
        value={ inputValues.email }
        onChange={ inputHandle }
        name="email"
      />
      <input
        type="password"
        data-testid="password-input"
        value={ inputValues.password }
        onChange={ inputHandle }
        name="password"
      />
      <button
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ submitHandle }
      >
        Enter
      </button>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
