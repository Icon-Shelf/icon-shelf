module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        highlight: '#FF5930',
        white: '#FFFFFF',
        body: '#777F93',
        primary: '#7230FF',
        black1: '#0D1118',
        black2: '#141C25',

        gradientCoolMint: 'linear-gradient(180deg, #696EFF 0%, #BFEEE8 100%)',
        gradientGrapeGum: 'linear-gradient(180deg, #696EFF 0%, #F7ABFF 100%)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
};
