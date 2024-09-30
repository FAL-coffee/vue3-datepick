import { afterEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { EnhancedDay, Props } from '~/types'
import { useDatePicker } from './useDatePicker'

// Vueのライフサイクルフックだけをモック
vi.mock('vue', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('vue')
  return {
    ...actual,
    onBeforeUnmount: vi.fn(), // onBeforeUnmountだけをモック
  }
})

describe('useDatePicker', () => {
  const mockEmit = vi.fn()

  const props: Required<Props> = {
    modelValue: '2023-09-30',
    displayFormat: 'yyyy-MM-dd',
    isDateDisabled: vi.fn(() => false),
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    startWeekOnSunday: false,
    yearFirst: false,
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
    disabled: false,
    placeholder: 'Please select a date',
    yearContent: '',
  }

  const el = ref(null)
  const outerWrap = ref(null)

  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })

  it('should initialize correctly', () => {
    const { inputValue, currentPeriod, opened } = useDatePicker(
      props,
      el,
      outerWrap,
      mockEmit
    )

    expect(inputValue.value).toBe('2023-09-30')
    expect(currentPeriod.value).toEqual({ month: 8, year: 2023 })
    expect(opened.value).toBe(false)
  })

  it('should open the date picker', () => {
    const { openUpdated, opened } = useDatePicker(
      props,
      el,
      outerWrap,
      mockEmit
    )

    openUpdated()
    expect(opened.value).toBe(true)
  })

  it('should close the date picker', () => {
    const { closeUpdated, opened } = useDatePicker(
      props,
      el,
      outerWrap,
      mockEmit
    )

    closeUpdated()
    expect(opened.value).toBe(false)
  })

  it('should update the modelValue when a valid date is selected', () => {
    const { selectDateItem } = useDatePicker(props, el, outerWrap, mockEmit)

    const item: EnhancedDay = {
      date: new Date('2023-10-01'),
      disabled: false,
    }
    selectDateItem(item)

    expect(mockEmit).toHaveBeenCalledWith('update:modelValue', '2023-10-01')
  })

  it('should not select a disabled date', () => {
    const { selectDateItem } = useDatePicker(props, el, outerWrap, mockEmit)

    const item: EnhancedDay = {
      date: new Date('2023-10-01'),
      disabled: true,
    }
    selectDateItem(item)

    expect(mockEmit).not.toHaveBeenCalled()
  })

  it('should handle input correctly', () => {
    const { handleInput, handleFocusOut } = useDatePicker(
      props,
      el,
      outerWrap,
      mockEmit
    )

    const inputElement = document.createElement('input')
    inputElement.value = '2023-10-01'
    const event = { target: inputElement } as unknown as Event
    handleInput(event)
    handleFocusOut()

    expect(mockEmit).toHaveBeenCalledWith('update:modelValue', '2023-10-01')
  })

  it('should handle focus out and emit correct value', async () => {
    const { handleFocusOut, inputValue } = useDatePicker(
      props,
      el,
      outerWrap,
      mockEmit
    )

    inputValue.value = '2023-10-01'
    handleFocusOut()

    expect(mockEmit).toHaveBeenCalledWith('update:modelValue', '2023-10-01')
  })

  it('should close via overlay click', () => {
    const { closeViaOverlay, opened } = useDatePicker(
      props,
      el,
      outerWrap,
      mockEmit
    )

    const event = { target: outerWrap.value } as Event
    closeViaOverlay(event)

    expect(opened.value).toBe(false)
  })
})
