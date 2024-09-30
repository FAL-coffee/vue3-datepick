# vue3-datepick

A simple, customizable date picker component for Vue 3.

<iframe src="https://codesandbox.io/embed/qhlg7t?view=preview&hidenavigation=1"
  style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
  title="vue3-datepick-example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```ts
import { createApp, h, ref } from 'vue'
import DatePicker from 'vue3-datepick'

const App = {
  setup() {
    const selectedDate = ref('2023-10-01')

    const updateModelValue = (newValue) => {
      selectedDate.value = newValue
    }

    return {
      selectedDate,
      updateModelValue,
    }
  },
  render() {
    return h(DatePicker, {
      modelValue: this.selectedDate,
      'onUpdate:modelValue': this.updateModelValue,
      displayFormat: 'yyyy-MM-dd',
      disabled: false,
      placeholder: 'Please select a date',
      isDateDisabled: (date) => date.getDay() === 0,
      months: [
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
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yearFirst: false,
      startWeekOnSunday: false,
      yearContent: '',
    })
  },
}

createApp(App).mount('#app')
```

## Features

- Simple interface
- Customizable date formats and styles
- Disable specific dates
- Lightweight with minimal dependencies

## Installation

To install the component in your project, run the following command:

```bash
npm install vue3-datepick
```

or using `yarn`:

```bash
yarn add vue3-datepick
```

## Basic Usage

```vue
<template>
  <DatePick v-model="selectedDate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DatePick from 'vue3-datepick'

const selectedDate = ref('')
</script>
```

For more detailed setup instructions, refer to the [Installation Guide](/guide/install).
