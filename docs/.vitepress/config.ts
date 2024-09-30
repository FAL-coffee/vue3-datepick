import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue3-datepick',
  description: 'A simple and customizable date picker for Vue 3.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/install' },
      { text: 'API', link: '/api/' },
      { text: 'GitHub', link: 'https://github.com/FAL-coffee/vue3-datepick' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Installation', link: '/guide/install' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Customization', link: '/guide/customization' },
            { text: 'Examples and Demos', link: '/guide/examples' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [{ text: 'API', link: '/api/' }],
        },
      ],
    },
  },
})
