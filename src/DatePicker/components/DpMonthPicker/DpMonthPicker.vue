<script setup lang="ts">
import { Props } from "./types"
withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="monthpicker__period-control">
    <button
      :key="currentPeriod.month"
      type="button"
      class="monthpicker__month-button"
    >
      {{ months[currentPeriod.month] }}
    </button>
    <select v-model="currentPeriod.month" class="monthpicker__month-select">
      <option v-for="(month, index) in months" :key="month" :value="index">
        {{ month }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
