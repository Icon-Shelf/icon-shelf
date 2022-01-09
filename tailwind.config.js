module.exports = {
  content: ['./packages/renderer/index.html', './packages/renderer/src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        highlight: '#FF5930',
        white: '#f2f2f2',
        body: 'var(--body)',
        primary: '#7230FF',
        black1: '#0D1118',
        black2: '#141C25',
        black3: 'rgba(255, 255, 255, 0.1)',

        inputBorder: 'var(--inputBorder)',
        modalOverlay: '#777F93',

        gradientCoolMint: 'linear-gradient(180deg, #696EFF 0%, #BFEEE8 100%)',
        gradientGrapeGum: 'linear-gradient(180deg, #696EFF 0%, #F7ABFF 100%)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
      ringWidth: ['active', 'focus-visible'],
      ringColor: ['active', 'focus-visible'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['last'],
    },
  },
  plugins: [],
};
