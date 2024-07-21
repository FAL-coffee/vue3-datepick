import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  isValid,
  parse,
  startOfMonth,
} from 'date-fns'

export function useDateUtilities(displayFormat: string) {
  /**
   * Generates a list of calendar dates based on the given year and month
   */
  const generateCalendarDates = (
    year: number,
    month: number,
    startWeekOnSunday: boolean = false
  ) => {
    const start = startOfMonth(new Date(year, month))
    const end = endOfMonth(new Date(year, month))
    const days = eachDayOfInterval({ start, end })

    // Add days from the previous month
    const startDayIndex = getDay(start)
    const offset = startWeekOnSunday ? startDayIndex : (startDayIndex + 6) % 7
    for (let i = 0; i < offset; i++) {
      days.unshift(addDays(start, -i - 1))
    }

    // Add days from the next month
    const endDayIndex = getDay(end)
    const remainingDays = startWeekOnSunday
      ? 6 - endDayIndex
      : (13 - endDayIndex) % 7
    for (let i = 0; i < remainingDays; i++) {
      days.push(addDays(end, i + 1))
    }

    return days
  }

  /**
   * @param {Date | ''} date
   * @returns {string}
   * @description
   * Converts a Date object to a string in the format of props.displayFormat
   * Returns an empty string if the input is an empty string
   */
  const formatDateToString = (date: Date | '') => {
    return date ? format(date, displayFormat) : ''
  }

  /**
   * @param {string | undefined} dateString
   * @returns {Date | string}
   * @description
   * Parses a string in the format of props.displayFormat into a Date object
   * Returns an empty string if the input is undefined or the parsing fails
   */
  const parseDateString = (dateString?: string) => {
    if (!dateString) return ''

    const parsedDate = parse(dateString, displayFormat, new Date())
    return isValid(parsedDate) ? parsedDate : ''
  }

  /**
   * @param {string} dateString
   * @returns {{ month: number, year: number }}
   * @description
   * Parses a string in the format of props.displayFormat to extract the month and year
   */
  const getPeriodFromValue = (dateString: string) => {
    const date = parseDateString(dateString) || new Date()

    return { month: date.getMonth(), year: date.getFullYear() }
  }

  /**
   * @param {string} value
   * @returns {string}
   * @description
   * Converts a string in the format of props.displayFormat into a format suitable for setting as the value of an input element
   */
  const valueToInputFormat = (value: string) => {
    return formatDateToString(parseDateString(value)) || value
  }

  return {
    formatDateToString,
    parseDateString,
    generateCalendarDates,
    isToday,
    isSameDay,
    getPeriodFromValue,
    valueToInputFormat,
  }
}
