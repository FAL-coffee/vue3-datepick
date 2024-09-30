# Examples and Demos

Here are some examples demonstrating various use cases of `vue3-datepick`.

## Basic Date Picker

This is a basic example of how to use `vue3-datepick`.

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

## Disabled Dates

You can disable specific dates, such as weekends or holidays, using the `isDateDisabled` prop.

Example: Disable Sundays:

```vue
<template>
  <DatePicker v-model="selectedDate" :is-date-disabled="isDateDisabled" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
const isDateDisabled = (date: Date) => date.getDay() === 0 // Disable Sundays
</script>
```

## Custom Placeholder Text

You can customize the placeholder text that appears in the date picker input when no date is selected.

```vue
<template>
  <DatePicker v-model="selectedDate" placeholder="Pick a date" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
</script>
```

## Custom Date Format

Customize the date format that is displayed in the input field. For example, use `DD/MM/YYYY` instead of the default `YYYY-MM-DD`.

```vue
<template>
  <DatePicker v-model="selectedDate" display-format="DD/MM/YYYY" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
</script>
```
