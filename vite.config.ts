import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(
  (() => {
    const isDevMode = process.env.DEV_MODE === 'true'
    return {
      plugins: [
        vue(),
        dts({
          entryRoot: 'src/DatePicker',
          outDir: 'dist',
        }),
        cssInjectedByJsPlugin(),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/DatePicker'),
          name: 'DatePicker',
          fileName: 'vue3-datepick',
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          external: ['vue', 'date-fns'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
      css: {
        modules: {
          scopeBehaviour: 'local',
        },
        preprocessorOptions: {
          scss: {
            additionalData: isDevMode
              ? `@import "dev/_variables.scss";`
              : `@import "src/DatePicker/styles/variables.scss";`,
          },
        },
      },
    }
  })()
)
