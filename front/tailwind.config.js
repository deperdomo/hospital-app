/** @type {import('tailwindcss').Config} */
// Sistema de diseño (fase 0 del rediseño). Contrastes sobre blanco en la propuesta:
// brand-500 5,01:1 · brand-600 7,14:1 · ink-600 7,72:1 · brand-400 solo decoración (3,23:1).
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF7FA', 100: '#D6EDF4', 200: '#AED9E7', 300: '#7DBFD5', 400: '#3B9AB8',
          500: '#2A7891', 600: '#1F5F73', 700: '#184B5B', 800: '#123945', 900: '#0B2630',
          DEFAULT: '#2A7891', dark: '#1F5F73', light: '#3B9AB8', // alias actuales: no romper nada
        },
        ink: { 900: '#0F1F26', 700: '#2E3D45', 600: '#46555E', 500: '#5B6A73', 400: '#7C8A93' },
        line: { DEFAULT: '#D5DDE2', subtle: '#E7ECEF', strong: '#7C8A93' },
        surface: { DEFAULT: '#FFFFFF', muted: '#F4F7F8', canvas: '#F7FAFB' },
        success: { 50: '#E8F5EC', 200: '#B7DFC3', 700: '#15703A', DEFAULT: '#15703A' },
        warning: { 50: '#FDF4E3', 200: '#F1D59A', 700: '#995A00', DEFAULT: '#995A00' },
        danger:  { 50: '#FDECEC', 200: '#F5BDBD', 600: '#C62828', 700: '#A61F1F', DEFAULT: '#C62828' },
        info:    { 50: '#EAF1FC', 200: '#BFD3F5', 700: '#1D5BBF', DEFAULT: '#1D5BBF' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
      fontSize: {
        display: ['2.5rem',   { lineHeight: '1.15', letterSpacing: '-0.02em',  fontWeight: '700' }],
        h1:      ['2rem',     { lineHeight: '1.2',  letterSpacing: '-0.015em', fontWeight: '700' }],
        h2:      ['1.5rem',   { lineHeight: '1.3',  letterSpacing: '-0.01em',  fontWeight: '600' }],
        h3:      ['1.25rem',  { lineHeight: '1.4',  fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body:    ['1rem',     { lineHeight: '1.6' }],
        meta:    ['0.875rem', { lineHeight: '1.45' }],   // minimo para texto; text-xs prohibido salvo legales
      },
      borderRadius: { control: '0.625rem', card: '1rem', pill: '9999px' },
      boxShadow: {
        card:    '0 1px 2px rgb(15 31 38 / 0.04), 0 1px 3px rgb(15 31 38 / 0.06)',
        raised:  '0 4px 12px -2px rgb(15 31 38 / 0.10), 0 2px 4px -2px rgb(15 31 38 / 0.06)',
        overlay: '0 24px 48px -12px rgb(15 31 38 / 0.28)',
      },
      minHeight: { touch: '2.75rem' },   // 44 px: objetivo tactil comodo (AA exige 24)
      minWidth:  { touch: '2.75rem' },
      maxWidth:  { content: '72rem' },
    },
  },
  plugins: [],
}
