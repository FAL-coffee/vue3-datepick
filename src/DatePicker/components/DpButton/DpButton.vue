<script setup lang="ts">
import { Props } from './types'
const props = defineProps<Props>()
const emit = defineEmits(['click'])

const getClass = () => {
  return {
    'datepicker__button--next': props.direction === 'next',
    'datepicker__button--prev': props.direction === 'prev',
  }
}
</script>

<template>
  <button
    :class="['datepicker__button', getClass()]"
    type="button"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@import './style.scss';
</style>
