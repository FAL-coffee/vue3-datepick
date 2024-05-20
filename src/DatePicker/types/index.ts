export type Props = {
  modelValue: string
  yearFirst?: boolean
  months?: string[]
  startWeekOnSunday?: boolean
  weekdays?: string[]
  disabled?: boolean
  placeholder?: string
  displayFormat?: string
  isDateDisabled?: (date: Date) => boolean
  yearContent?: string
}

export type EnhancedDay = {
  date: Date
  outOfRange?: boolean
  disabled?: boolean
  today?: boolean
  dateKey?: string
  selected?: boolean
}
