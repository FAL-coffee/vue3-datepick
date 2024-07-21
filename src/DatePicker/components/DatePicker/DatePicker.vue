<script setup lang="ts">
import { ref } from 'vue'
import { Props } from '../../types'
import DpButton from '../DpButton/DpButton.vue'
import DpCalendar from '../DpCalendar/DpCalendar.vue'
import DpMonthPicker from '../DpMonthPicker/DpMonthPicker.vue'
import DpYearPicker from '../DpYearPicker/DpYearPicker.vue'
import { useDatePicker } from './useDatePicker'

const props = withDefaults(defineProps<Props>(), {
  yearFirst: true,
  months: () => [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  startWeekOnSunday: false,
  weekdays: () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  disabled: false,
  placeholder: 'Please select a date',
  displayFormat: 'yyyy.MM.dd',
  isDateDisabled: () => false,
  yearContent: '',
})

const outerWrap = ref<Element | null>(null)
const el = ref<Element | null>(null)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const {
  opened,
  toggle,
  openUpdated,
  closeUpdated,
  inputValue,
  handleInput,
  handleFocusOut,
  valueToInputFormat,
  currentPeriod,
  incrementMonth,
  weekdaysSorted,
  selectDateItem,
  closeViaOverlay,
} = useDatePicker(props, el, outerWrap, emit)
</script>

<template>
  <div ref="el" class="datepicker">
    <slot
      :open="openUpdated"
      :close="closeUpdated"
      :toggle="toggle"
      :input-value="inputValue"
      :process-user-input="handleInput"
      :process-user-focus-out="handleFocusOut"
      :value-to-input-format="valueToInputFormat"
    >
      <input
        id="day-input"
        ref="datepickerInput"
        type="text"
        name="date-picker"
        class="datepicker__input"
        autocomplete="off"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :value="inputValue"
        @input="handleInput"
        @focusout="handleFocusOut"
        @focus="openUpdated()"
        @click="openUpdated()"
      />
    </slot>
    <transition name="vdp-toggle-calendar">
      <div
        v-if="opened"
        ref="outerWrap"
        class="datepicker__outer-wrap"
        @click="closeViaOverlay"
      >
        <div class="datepicker__inner-wrap">
          <header class="datepicker__header">
            <DpButton direction="prev" @click="incrementMonth(-1)" />
            <DpButton direction="next" @click="incrementMonth(1)" />
            <div
              :class="[
                'datepicker__period-controls',
                { 'datepicker__period-controls--reverse': props.yearFirst },
              ]"
            >
              <DpMonthPicker
                :current-period="currentPeriod"
                :months="props.months"
              />
              <DpYearPicker :current-period="currentPeriod" :yearContent />
            </div>
          </header>
          <table class="datepicker__table">
            <thead>
              <tr>
                <th
                  v-for="(weekday, weekdayIndex) in weekdaysSorted"
                  :key="weekdayIndex"
                  class="datepicker__head-cell"
                >
                  <span class="datepicker__head-cell-content">{{
                    weekday
                  }}</span>
                </th>
              </tr>
            </thead>
            <DpCalendar
              :value="props.modelValue"
              :display-format="props.displayFormat"
              :is-date-disabled="props.isDateDisabled"
              :start-week-on-sunday="props.startWeekOnSunday"
              :current-period="currentPeriod"
              :select-date-item="selectDateItem"
            />
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
