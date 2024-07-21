<script setup lang="ts">
import { ref } from 'vue'

// Reactive state for the counter
const count = ref(0)

// Method to increment the count
const increment = () => {
  count.value += 1
}
</script>

<template>
  <div>
    <p>Current count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
