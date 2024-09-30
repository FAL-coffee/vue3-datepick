import { Ref, computed, ref, watch } from 'vue'
import { useCloseEventListener } from '~/composables/useCloseEventListener'
import { useDateUtilities } from '~/composables/useDateUtilities'
import { useToggle } from '~/composables/useToggle'
import { EnhancedDay, Props } from '~/types'

export const useDatePicker = (
  props: Required<Props>,
  el: Ref<Element | null>,
  outerWrap: Ref<Element | null>,
  emit: (event: 'update:modelValue', value: string) => void
) => {
  // Date utilities
  const {
    formatDateToString,
    parseDateString,
    getPeriodFromValue,
    valueToInputFormat,
  } = useDateUtilities(props.displayFormat)

  // Toggle state
  const { opened, open, toggle, close } = useToggle(false)

  // State
  const currentPeriod = ref(getPeriodFromValue(props.modelValue))
  const inputValue = ref(valueToInputFormat(props.modelValue))
  const isClickInside = ref(false)
  // ------------------------------

  // Event listeners
  const { addCloseEvents, removeCloseEvents } = useCloseEventListener(
    el,
    opened,
    close
  )

  // Methods
  const openUpdated = () => {
    if (!opened.value) {
      open()
      currentPeriod.value = getPeriodFromValue(props.modelValue)
      addCloseEvents()
    }
  }

  const closeUpdated = () => {
    if (opened.value) {
      close()
      removeCloseEvents()
    }
  }

  const handleInput = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      inputValue.value = e.target.value
    }
  }

  const handleFocusOut = () => {
    if (isClickInside.value) {
      isClickInside.value = false
      return
    }

    const userDate = parseDateString(inputValue.value)
    if (userDate && !props.isDateDisabled(userDate)) {
      emit('update:modelValue', formatDateToString(userDate))
    } else {
      emit('update:modelValue', '')
    }
  }

  const handleMousedown = () => {
    isClickInside.value = true
  }

  const closeViaOverlay = (e: Event) => {
    if (e.target === outerWrap.value) {
      closeUpdated()
    }
  }

  const incrementMonth = (increment: number) => {
    const refDate = new Date(
      currentPeriod.value.year,
      currentPeriod.value.month
    )
    const incrementDate = new Date(
      refDate.getFullYear(),
      refDate.getMonth() + increment
    )

    currentPeriod.value = {
      month: incrementDate.getMonth(),
      year: incrementDate.getFullYear(),
    }
  }

  const valueDate = computed(() => {
    const value = props.modelValue
    return value ? parseDateString(value) : undefined
  })

  const selectDateItem = (item: EnhancedDay) => {
    if (!item.disabled) {
      const newDate = new Date(item.date)
      emit('update:modelValue', formatDateToString(newDate))
      closeUpdated()
    }
  }

  const isValidValue = computed(() => {
    const valueDateRef = valueDate.value
    return props.modelValue ? Boolean(valueDateRef) : true
  })

  const weekdaysSorted = computed(() => {
    if (props.startWeekOnSunday) {
      const weekdays = props.weekdays.slice()
      weekdays.unshift(weekdays.pop()!)
      return weekdays
    } else {
      return props.weekdays
    }
  })

  watch(
    () => props.modelValue,
    (value) => {
      if (isValidValue.value) {
        inputValue.value = valueToInputFormat(value)
        currentPeriod.value = getPeriodFromValue(value)
      }
    }
  )

  return {
    props,
    opened,
    toggle,
    el,
    valueToInputFormat,
    outerWrap,
    weekdaysSorted,
    inputValue,
    currentPeriod,
    valueDate,
    isValidValue,
    openUpdated,
    closeUpdated,
    handleInput,
    handleFocusOut,
    handleMousedown,
    closeViaOverlay,
    incrementMonth,
    selectDateItem,
  }
}
