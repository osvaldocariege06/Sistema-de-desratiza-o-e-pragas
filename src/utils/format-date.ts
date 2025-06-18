import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export const formateDate = (value?: Date | string) => {
  if (!value) return ''

  const parsedDate = new Date(value)

  if (isNaN(parsedDate.getTime())) {
    // Data inválida
    console.warn('Data inválida:', value)
    return ''
  }

  return format(parsedDate, 'dd, MMM yyyy', { locale: pt })
}
