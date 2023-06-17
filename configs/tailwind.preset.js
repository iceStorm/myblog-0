const appConfig = require('./app.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // preflight: false,
  },
  darkMode: 'class',
  theme: {
    container: {
      padding: '2em',
      center: true,
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1224px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: 'rgb(24,25,26)'
        },
        ...appConfig.themePreset
      }
    }
  },
  plugins: []
}
