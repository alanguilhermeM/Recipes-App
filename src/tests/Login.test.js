import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Pagina login', () => {
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
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'dhiego@gmail.com');
    userEvent.type(passwordInput, '1234567788');
    expect(screen.getByTestId('login-submit-btn')).not.toBeDisabled();
    userEvent.type(emailInput, 'dhiego@gmail.com');
    userEvent.type(passwordInput, '12');
    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
    userEvent.type(emailInput, 'dhiego@');
    userEvent.type(passwordInput, '12fdfsdfafdfafdfda');
    expect(screen.getAllByRole('button')).toBeDisabled();
  });
});
