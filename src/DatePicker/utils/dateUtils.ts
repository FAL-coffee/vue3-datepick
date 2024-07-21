import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isValid,
  parse,
  startOfMonth,
} from 'date-fns'

/**
 * Generates a list of calendar dates based on the given year and month
 */
const generateCalendarDates = (year: number, month: number) => {
  const start = startOfMonth(new Date(year, month))
  const end = endOfMonth(new Date(year, month))
  const days = eachDayOfInterval({ start, end })

  // Add days from the previous month
  const startDayIndex = getDay(start)
  for (let i = 0; i < startDayIndex; i++) {
    days.unshift(addDays(start, -i - 1))
  }

  // Add days from the next month
  const endDayIndex = getDay(end)
  for (let i = 0; i < 6 - endDayIndex; i++) {
    days.push(addDays(end, i + 1))
  }

  return days
}

/**
 * @param {string} displayFormat
 * @param {Date | ''} date
 * @returns {string}
 * @description
 * Converts a Date object to a string in the format of displayFormat
 * Returns an empty string if the input is an empty string
 */
const formatDateToString = (displayFormat: string, date: Date | '') => {
  return date ? format(date, displayFormat) : ''
}

/**
 * @param {string} displayFormat
 * @param {string | undefined} dateString
 * @returns {Date | string}
 * @description
 * Parses a string in the format of displayFormat into a Date object
 * Returns an empty string if the input is undefined or parsing fails
 */
const parseDateString = (displayFormat: string, dateString?: string) => {
  if (!dateString) return ''

  const parsedDate = parse(dateString, displayFormat, new Date())
  return isValid(parsedDate) ? parsedDate : ''
}

/**
 * @param {string} dateString
 * @returns {{ month: number, year: number }}
 * @description
 * Parses a string in the format of displayFormat to extract the month and year
 */
const getPeriodFromValue = (dateString: string) => {
  const date = parseDateString(dateString) || new Date()

  return { month: date.getMonth(), year: date.getFullYear() }
}

/**
 * @param {string} displayFormat
 * @param {string} value
 * @returns {string}
 * @description
 * Converts a string in the format of displayFormat to a format suitable for setting as an input element's value
 */
const valueToInputFormat = (displayFormat: string, value: string) => {
  return (
    formatDateToString(displayFormat, parseDateString(displayFormat, value)) ||
    value
  )
}

export {
  formatDateToString,
  generateCalendarDates,
  getPeriodFromValue,
  parseDateString,
  valueToInputFormat,
}
