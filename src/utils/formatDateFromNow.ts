import dayjs from '@/lib/dayjs'

export function formatDateFromNow(date: Date): string {
  const formattedDate = dayjs().to(dayjs(date))

  return formattedDate[0].toUpperCase() + formattedDate.slice(1)
}
