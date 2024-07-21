import { EnhancedDay } from '../../types'

export type Props = {
  value: string
  currentPeriod: { year: number; month: number }
  displayFormat: string
  isDateDisabled: (date: Date) => boolean
  selectDateItem: (item: EnhancedDay) => void
  startWeekOnSunday: boolean
}
