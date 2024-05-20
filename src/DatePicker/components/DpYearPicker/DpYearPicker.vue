<script setup lang="ts">
import { computed } from "vue"
import { range } from "../../utils/arrayUtils"
import { Props } from "./types"
const props = defineProps<Props>()

const yearRange = computed(() => {
  const currentYear = props.currentPeriod.year
  let yearsRange: number[] = range(currentYear - 10, currentYear + 10)

  if (yearsRange.indexOf(currentYear) < 0) {
    yearsRange.push(currentYear)
    yearsRange = yearsRange.sort()
  }

  return yearsRange
})
</script>

<template>
  <div class="yearpicker__period-control">
    <button
      :key="currentPeriod.year"
      type="button"
      class="yearpicker__year-button"
    >
      {{ currentPeriod.year }}{{ yearContent }}
    </button>
    <select v-model="currentPeriod.year" class="yearpicker__year-select">
      <option v-for="year in yearRange" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>
