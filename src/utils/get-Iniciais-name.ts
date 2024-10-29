export function getIniciais(name: string) {
  if (typeof name !== 'string') return

  const fullname = name.split(' ')
  const iniciais = fullname.map(name => name[0]).join('')

  return iniciais
}
