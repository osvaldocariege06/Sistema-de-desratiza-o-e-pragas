export function getIniciais(nome: string) {
  const nomeCompleto = nome.split(' ')
  const iniciais = nomeCompleto.map((nome) => nome[0]).join('')
  return iniciais
}
