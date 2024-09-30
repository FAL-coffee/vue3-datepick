# Getting Started

This guide will help you get started with using `vue3-datepick` in your project.

## Basic Usage

To use `vue3-datepick`, start by installing the package and adding it to your component.

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

In this example, the selected date is bound to the `selectedDate` variable using `v-model`. You can now use this variable elsewhere in your application.

## Customizing the Date Format

You can easily change the format of the date displayed in the input by using the `displayFormat` prop.

Example: Set the date format to `MM/dd/yyyy`:

```vue
<template>
  <DatePicker v-model="selectedDate" display-format="MM/dd/yyyy" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
</script>
```

## Disabling Specific Dates

You can disable specific dates using the `isDateDisabled` prop. The following example disables Sundays:

```vue
<template>
  <DatePicker v-model="selectedDate" :is-date-disabled="isDateDisabled" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
const isDateDisabled = (date: Date) => {
  return date.getDay() === 0 // Disable Sundays
}
</script>
```

## Customizing Month and Weekday Names

You can customize the names of months and weekdays by passing arrays to the `months` and `weekdays` props.

Example:

```vue
<template>
  <DatePicker v-model="selectedDate" :months="months" :weekdays="weekdays" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
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
const weekdays = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
</script>
```

---

With these examples, you should be able to quickly integrate `vue3-datepick` into your project and customize it according to your needs.
