export default function Login() {
  return (
    <section id="section-login-inputs">
      <input type="text" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button data-testid="login-submit-btn" disabled>Enter</button>
    </section>
  );
}
