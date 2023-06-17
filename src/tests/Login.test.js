import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './mockMatchMedia';
import Login from '../pages/Login';

window.matchMedia = jest.fn().mockImplementation(() => ({
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('Pagina login', () => {
  const email = 'dhiego@gmail.com';
  render(<Login />);
  test('verifica se o input email está presente na tela', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('verifica se o input password está presente na tela', () => {
    render(<Login />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('verifica se o botão está presente na tela', () => {
    render(<Login />);
    expect(screen.getAllByRole('button')).toBeInTheDocument();
  });

  test('verifica se o botão está desabiltado ao iniciar a tela', () => {
    render(<Login />);
    expect(screen.getAllByRole('button')).toBeDisabled();
  });

  test('verifica se ao digitar o email e o password no formato correto ele habilita o botão e se não estiver o botão é desabilitado novamente', () => {
    render(<Login />);
    const button = screen.getByTestId('login-submit-btn');
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '1234567788');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, '12');
    expect(button).toBeDisabled();
    userEvent.type(emailInput, 'dhiego@');
    userEvent.type(passwordInput, '12fdfsdfafdfafdfda');
    expect(screen.getAllByRole('button')).toBeDisabled();
  });
});
