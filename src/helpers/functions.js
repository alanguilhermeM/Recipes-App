export function handlePathname(location) {
  const endereco = location.pathname.split('/');
  const tipo = endereco[1];
  const id = endereco[2];
  return [tipo, id];
}
