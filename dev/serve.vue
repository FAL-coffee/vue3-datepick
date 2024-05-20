<script setup lang="ts">
import { ref } from "vue"
import DatePicker from "../src/DatePicker/components/DatePicker/DatePicker.vue"

const currentDate = defineModel("currentDate", {
  type: String,
  default: () => {
    const date = new Date()
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  },
})

// set displayFormat to "yyyy.MM.dd"
const desplayFormat = ref("yyyy.MM.dd")

// set disabled to false
const disabled = ref(false)

// set placeholder to "Please select a date"
const placeholder = ref("Please select a date")

// set isDateDisabled to disable Sundays
const isDateDisabled = ref((date: Date) => date.getDay() === 0)

// set months to the full list of months
const months = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
])

// set weekdays to the full list of weekdays
const weekdays = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])

// set yearFirst to false
const yearFirst = ref(false)

// set startWeekOnSunday to false
const startWeekOnSunday = ref(false)

// set yearContent to ""
const yearContent = ref("")
</script>

<template>
  <div>
    <DatePicker
      v-model="currentDate"
      ref="datePick"
      :months="months"
      :weekdays="weekdays"
      :year-first="yearFirst"
      :start-week-on-sunday="startWeekOnSunday"
      :display-format="desplayFormat"
      :is-date-disabled="isDateDisabled"
      :disabled="disabled"
      :placeholder="placeholder"
      :year-content="yearContent"
    />
  </div>
</template>
