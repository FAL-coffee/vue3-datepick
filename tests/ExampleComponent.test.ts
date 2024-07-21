import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ExampleComponent from './ExampleComponent.vue'

describe('ExampleComponent.vue', () => {
  it('renders the initial count', () => {
    const wrapper = mount(ExampleComponent)
    expect(wrapper.text()).toContain('Current count: 0')
  })

  it('increments the count when button is clicked', async () => {
    const wrapper = mount(ExampleComponent)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.text()).toContain('Current count: 1')
  })
})
