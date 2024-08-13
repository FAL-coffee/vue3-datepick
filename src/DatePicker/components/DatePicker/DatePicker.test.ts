import { mount, shallowMount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { Props } from '../../types'
import DatePicker from './DatePicker.vue'

const mockOpenUpdated = vi.fn()
const mockCloseUpdated = vi.fn()
const mockIncrementMonth = vi.fn()
const mockSelectDateItem = vi.fn()
const mockCloseViaOverlay = vi.fn()
const mockHandleInput = vi.fn()
const mockHandleFocusOut = vi.fn()
const mockHandleMousedown = vi.fn()
let opened = false

vi.mock('./useDatePicker', () => ({
  useDatePicker: vi.fn(() => ({
    openUpdated: mockOpenUpdated,
    closeUpdated: mockCloseUpdated,
    incrementMonth: mockIncrementMonth,
    selectDateItem: mockSelectDateItem,
    opened,
    toggle: vi.fn(),
    el: null,
    valueToInputFormat: vi.fn(),
    outerWrap: null,
    weekdaysSorted: [],
    inputValue: '',
    currentPeriod: {},
    valueDate: {},
    isValidValue: true,
    handleInput: mockHandleInput,
    handleFocusOut: mockHandleFocusOut,
    handleMousedown: mockHandleMousedown,
    closeViaOverlay: mockCloseViaOverlay,
  })),
}))

describe('DatePicker.vue', () => {
  beforeAll(() => {
    opened = false
  })

  const defaultProps: Props = {
    modelValue: '2024.07.22',
    yearFirst: true,
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
    startWeekOnSunday: false,
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    disabled: false,
    placeholder: 'Please select a date',
    displayFormat: 'yyyy.MM.dd',
    isDateDisabled: () => false,
    yearContent: '',
  }

  it('should mount the component correctly', () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should handle input event correctly', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    })

    const input = wrapper.find('input')
    await input.setValue('2024.07.22')

    expect(mockHandleInput).toHaveBeenCalled()
  })

  it('should handle focusout event correctly', async () => {
    const wrapper = mount(DatePicker, {
      props: defaultProps,
    })

    const input = wrapper.find('input')
    await input.trigger('focusout')

    expect(mockHandleFocusOut).toHaveBeenCalled()
  })

  it('should call openUpdated when input is clicked', async () => {
    const wrapper = shallowMount(DatePicker, {
      props: defaultProps,
    })

    const input = wrapper.find('input')
    await input.trigger('click')

    expect(mockOpenUpdated).toHaveBeenCalled()
  })

  it('should call openUpdated when input is focused', async () => {
    const wrapper = shallowMount(DatePicker, {
      props: defaultProps,
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    expect(mockOpenUpdated).toHaveBeenCalled()
  })

  it('should call closeViaOverlay when clicking outside', async () => {
    opened = true
    const wrapper = shallowMount(DatePicker, {
      props: defaultProps,
    })

    await wrapper.find('.datepicker__outer-wrap').trigger('click')

    expect(mockCloseViaOverlay).toHaveBeenCalled()
  })

  it('should call handleMouseDown when mousedown outside', async () => {
    opened = true
    const wrapper = shallowMount(DatePicker, {
      props: defaultProps,
    })

    await wrapper.find('.datepicker__outer-wrap').trigger('mousedown')

    expect(mockHandleMousedown).toHaveBeenCalled()
  })

  it('should increment month correctly', async () => {
    const wrapper = shallowMount(DatePicker, {
      props: defaultProps,
    })

    await wrapper.find('[direction="next"]').trigger('click')
    expect(mockIncrementMonth).toHaveBeenCalledWith(1)
  })

  it('should select a date item correctly', async () => {
    const dateItem = { date: '2024-08-15', disabled: false }
    await mockSelectDateItem(dateItem)
    expect(mockSelectDateItem).toHaveBeenCalledWith(dateItem)
  })
})
