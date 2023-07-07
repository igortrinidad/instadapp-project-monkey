

export const useFormatDateToEnUs = (date: Date) => {
  return new Date(date).toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}