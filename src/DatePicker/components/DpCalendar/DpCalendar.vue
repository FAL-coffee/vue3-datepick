<script setup lang="ts">
import { computed } from 'vue'
import { useDateUtilities } from '../../composables/useDateUtilities'
import { EnhancedDay } from '../../types'
import { chunkArray } from '../../utils/arrayUtils'
import { Props } from './types'

const props = defineProps<Props>()

// Date utilities
const {
  formatDateToString,
  parseDateString,
  generateCalendarDates,
  isToday,
  isSameDay,
} = useDateUtilities(props.displayFormat)

const currentPeriodDates = computed(() => {
  const dates = generateCalendarDates(
    props.currentPeriod.year,
    props.currentPeriod.month,
    props.startWeekOnSunday
  ).map((day) => ({
    date: day,
    outOfRange: day.getMonth() !== props.currentPeriod.month,
    disabled: props.isDateDisabled(day),
    today: isToday(day),
    dateKey: formatDateToString(day),
    selected: props.value
      ? isSameDay(day, parseDateString(props.value))
      : false,
  }))
  return chunkArray<EnhancedDay>(dates, 7)
})
</script>

<template>
  <tbody :key="currentPeriod.year + '-' + currentPeriod.month">
    <tr
      v-for="(week, weekIndex) in currentPeriodDates"
      :key="weekIndex"
      class="calendar__row"
    >
      <td
        v-for="item in week"
        :key="item.dateKey"
        :class="[
          'calendar__cell',
          {
            'calendar__cell--selectable': !item.disabled,
            'calendar__cell--selected': item.selected,
            'calendar__cell--disabled': item.disabled,
            'calendar__cell--today': item.today,
            'calendar__cell--out-of-range': item.outOfRange,
          },
        ]"
        :data-id="item.dateKey"
        @click="selectDateItem(item)"
      >
        <slot name="cellContent" :item="item">
          <div class="calendar__cell-content">
            {{ item.date.getDate() }}
          </div>
        </slot>
      </td>
    </tr>
  </tbody>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
