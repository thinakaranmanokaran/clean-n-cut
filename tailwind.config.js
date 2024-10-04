module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bgLight: '#FAF7F0',
        bgLightGlass: '#FAF7F020',
        bgDark: '#191919'
      },

      fontFamily: {
        creato: ['creato', 'sans-serif'],
        creatobold: ['creatobold', 'sans-serif'],
        avigea: ['avigea', 'sans-serif'],
      },

      keyframes: {
        posMove: {
          '0%': { left: '-300px' },
          '50%': { left: '1200px' },
          '100%': { left: '-300px' },
        },

        negMove: {
          '0%': { right: '-300px' },
          '50%': { right: '1200px' },
          '100%': { right: '-300px' },
        },
        xsPosMove: {
          '0%': { left: '-300px' },
          '50%': { left: '600px' },
          '100%': { left: '-300px' },
        },

        xsNegMove: {
          '0%': { right: '-300px' },
          '50%': { right: '600px' },
          '100%': { right: '-300px' },
        },
      },
      animation: {
        posMove: 'posMove 40s infinite ease-in-out',
        negMove: 'negMove 40s infinite ease-in-out',
        xsPosMove: 'xsPosMove 20s infinite ease-in-out',
        xsNegMove: 'xsNegMove 20s infinite ease-in-out',
      },

      screens: {
        'xs': '320px',
        'ms': '375px',
        sm: '425px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
