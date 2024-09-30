# Installation Guide

## Installation

To install `vue3-datepick` in your project, use one of the following commands:

### npm

```bash
npm install vue3-datepick
```

### yarn

```bash
yarn add vue3-datepick
```

## Basic Setup

After installing the package, you can start using the date picker in your Vue 3 application. Here's how to set it up:

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

In this example, the `DatePick` component is imported and used with `v-model` to bind the selected date to the `selectedDate` variable.
