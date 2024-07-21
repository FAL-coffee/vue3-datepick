# vue3-datepick

A Vue 3 date picker component with comprehensive features and Japanese localization.

## Features

- Date selection
- Month and year navigation
- Customizable date formats
- Disable specific dates
- Japanese localization

## Installation

```bash
npm install vue3-datepick
```

## Usage

### Basic Usage

```vue
<template>
  <DatePicker v-model="selectedDate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from 'vue3-datepick'
const selectedDate = ref('')
</script>
```

### Advanced Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from '../src/DatePicker/components/DatePicker/DatePicker.vue'

const currentDate = defineModel('currentDate', {
  type: String,
  default: () => {
    const date = new Date()
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  },
})

// set displayFormat to "yyyy.MM.dd"
const desplayFormat = ref('yyyy.MM.dd')

// set disabled to false
const disabled = ref(false)

// set placeholder to "Please select a date"
const placeholder = ref('Please select a date')

// set isDateDisabled to disable Sundays
const isDateDisabled = ref((date: Date) => date.getDay() === 0)

// set months to the full list of months
const months = ref([
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
])

// set weekdays to the full list of weekdays
const weekdays = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])

// set yearFirst to false
const yearFirst = ref(false)

// set startWeekOnSunday to false
const startWeekOnSunday = ref(false)

// set yearContent to ""
const yearContent = ref('')
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
```

## Props

- `v-model`: The selected date.
- `display-format`: The format to display the date.
- `is-date-disabled`: Function to disable specific dates.
- `disabled`: Disable the date picker.
- `placeholder`: Placeholder text for the input.
- `year-content`: Content for the year.
- `year-first`: Display year before month.
- `months`: Array of month names.
- `start-week-on-sunday`: Start the week on Sunday.
- `weekdays`: Array of weekday names.

## Development

### Project Setup

```bash
npm install
```

### Compile and Hot-Reload for Development

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

```bash
npm run build
```

## License

[MIT](./LICENSE)

## Author

FAL-coffee
