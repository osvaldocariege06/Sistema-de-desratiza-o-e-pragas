import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
export const formateDate = (value: Date | string) => {
  if (value === '') return

  const date = format(new Date(value), 'dd, MMM yyyy', { locale: pt })

  return date
}
