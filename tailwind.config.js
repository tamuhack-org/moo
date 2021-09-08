module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        transitionDuration: {
         '0': '0ms',
         '2000': '2000ms',
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-30deg)' },
            '50%': { transform: 'rotate(30deg)' },
          }
         },
         animation: {
          wiggle: 'wiggle 1s ease-in-out infinite',
         }
      },
    },
    variants: {},
    plugins: [],
}